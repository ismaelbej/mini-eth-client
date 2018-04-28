import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Grid,
  Header,
  Loader,
} from 'semantic-ui-react';
import BlockList from '../components/BlockList';
import {
  getBlockchainInfo,
  getBlockList,
} from '../lib/api';

const HOME_BLOCK_COUNT = 15;
const HOME_REFRESH_TIMEOUT = 10;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.refreshEvents = this.refreshEvents.bind(this);
  }

  componentDidMount() {
    this.loadData();
    setTimeout(this.refreshEvents, HOME_REFRESH_TIMEOUT * 1000);
  }

  async loadData() {
    try {
      this.setState({ loading: true, error: false });
      const { blockchain } = await getBlockchainInfo();
      const { blocks } = (blockchain.blockNumber >= 0) ?
        await getBlockList(blockchain.blockNumber, HOME_BLOCK_COUNT) : {};
      const data = {
        // blockchain,
        blocks,
      };
      this.setState({ loading: false, error: false, data });
    } catch (ex) {
      this.setState({ loading: false, error: true });
    }
  }

  async refreshEvents() {
    this.loadData();
    setTimeout(this.refreshEvents, HOME_REFRESH_TIMEOUT * 1000);
  }

  render() {
    const {
      loading,
      data: {
        // blockchain,
        blocks = [],
      } = {},
    } = this.state;
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Header as="h1">Home</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header as="h3">Recent blocks</Header>
            {loading && <Loader active inline size="tiny" />}
            <Button.Group floated="right">
              <Button
                content="More blocks.."
                as={Link}
                to="/block"
              />
            </Button.Group>
            <BlockList blocks={blocks} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Home;
