import React from 'react';
import { Button } from 'react-bootstrap';
import Transaction from './Transaction';
import { Link } from 'react-router-dom';
import history from '../history';

const POLL_INTERVAL_MS = 10000; //10 sec

class TransactionPool extends React.Component {
   state = { transactionPoolMap: {} };

   fetchTransactionPoolMap = () => {
      fetch(`${document.location.origin}/api/transaction-pool-map`)
         .then(response => response.json())
         .then(json => this.setState({ transactionPoolMap: json }));
   }

   fetchMineTransactions = () => {
      fetch(`${document.location.origin}/api/mine-transactions`)
         .then(response => {
            if(response.status === 200) {
               alert('succes');
               history.push('/blocks');
            }
            else {
               alert('The mine-transactions block request did not completed.');
            }
         });
   }

   componentDidMount() {
      this.fetchTransactionPoolMap();

      this.fetchTransactionPoolMapInterval = setInterval(
         () => this.fetchTransactionPoolMap(),
         POLL_INTERVAL_MS
      )
   }

   componentWillUnmount() {
      clearInterval(this.fetchTransactionPoolMapInterval);
   }

   render() {
      return (
         <div className='TransactionPool'>
            <div><Link to='/'>Home</Link></div>
            <h3>Transaction Pool</h3>
            {
               Object.values(this.state.transactionPoolMap).map(transaction => {
                  return (
                     <div key={transaction.id}>
                        <hr />
                        <Transaction transaction={transaction} />
                     </div>
                  )
               })
            }
            <hr />
            <Button 
               bsStyle='danger'
               onClick={this.fetchMineTransactions}
            >
               Mine the Transactions
            </Button>
         </div>
      )
   }
}

export default TransactionPool;