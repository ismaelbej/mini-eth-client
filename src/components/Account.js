import React from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
} from 'semantic-ui-react';
import { formatAmount } from '../utils/formatters';

const Account = (props) => {
  const { account } = props;
  if (!account) {
    return <div />;
  }
  return (
    <Table>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Address:</Table.Cell>
          <Table.Cell>{account.address}</Table.Cell>
        </Table.Row>
        {account.code && <Table.Row>
          <Table.Cell>Contract:</Table.Cell>
          <Table.Cell><Link to={`/contract/${account.address}`}>{account.address}</Link></Table.Cell>
        </Table.Row>}
        <Table.Row>
          <Table.Cell>Balance:</Table.Cell>
          <Table.Cell>{formatAmount(account.balance)}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Num. Transactions:</Table.Cell>
          <Table.Cell>{account.transactionCount}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default Account;
