import React from 'react';
import {
  getTransactionList
} from '../models/Transaction';
import TransactionList from './TransactionList';

const TX_START = 0;
const TX_COUNT = 10;

class TransactionListView extends React.Component {

  constructor(props) {
    super(props);

    const { block, start, count } = props;
    this.state = {
      txs: null,
      block: typeof block !== 'undefined' ? block : '',
      start: typeof start !== 'undefined' ? parseInt(start) : TX_START,
      count: typeof count !== 'undefined' ? parseInt(count) : TX_COUNT
    };
    console.log(this.state);
  }

  async loadTransactionList(block, start, count) {
    const { txs } = await getTransactionList(block, start, count);
    console.log(txs);
    this.setState({
      txs,
      block,
      start,
      count
    });
  }

  componentDidMount() {
    this.loadTransactionList(this.state.block, this.state.start, this.state.count);
  }

  componentWillReceiveProps(nextProps) {
    const { block, count, start } = nextProps;
    if (this.state.block !== block ||
      this.state.start !== start ||
      this.state.count !== count) {
      this.setState({
        txs: null,
        block,
        start,
        count
      });
      this.loadTransactionList(block, start, count);
    }
  }

  render() {
    return (
      <div>
        {!this.state.txs && 'Loading...'}
        {this.state.txs && <TransactionList txs={this.state.txs} />}
      </div>
    );
  }
}

export default TransactionListView;
