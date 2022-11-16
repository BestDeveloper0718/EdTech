import React from 'react';
import Web3 from 'web3';
import {useWeb3React} from "@web3-react/core";
import {ethers} from 'ethers';

const web3 = new Web3('https://bsc-dataseed1.binance.org/');


export default function Main(){
	const {formatEther} = ethers.utils;
	const {account, library, chainId} = useWeb3React();
	const [ethBalance, setEthBalance] = React.useState();
	const [bnbBalance, setBnbBalance] = React.useState();

	  React.useEffect(() => {
	    console.log('running')
	    if (library && account) {
	      let stale = false;
		  web3.eth.getBalance(account).then(balance =>{
			setBnbBalance(balance);
			console.log("---bnb balance",parseFloat(formatEther(balance)).toPrecision(4))
	  })

	      console.log(library)
	      library
	        .getBalance(account)
	        .then(balance => {
	          if (!stale) {
	          	console.log(balance)
	            setEthBalance(balance);
	          }
	        })
	        .catch(() => {
	          if (!stale) {
	            setEthBalance(null);
	          }
	        });
	       library.getBalance("ricmoo.eth").then(console.log);

	      return () => {
	        stale = true;
	        setEthBalance(undefined);
	      };
	    }
	  }, [library, account, chainId]);

		const fetchCurrencyData = () => {
			axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=10')
			.then(response => {
				const wanted = ['bitcoin', 'ethereum']
				const result = response.data.filter(currency =>wanted.includes(currency.id),)
				console.log(result);
				})
			.catch(err => console.log(err))
		}
	return(
		<div>
			<h5 className="balance-text">Total Amount: <span>{ethBalance === undefined ? "..." : ethBalance === null ? "Error" : `${parseFloat(formatEther(ethBalance)).toPrecision(4)}`}</span></h5>
			<h5 className="balance-text">ETH:
				<span>{ethBalance === undefined ? "..." : ethBalance === null ? "Error" : `${parseFloat(formatEther(ethBalance)).toPrecision(4)}`}
	            </span>
            </h5>
            <h5 className="balance-text">BNB:
				<span><span>{ethBalance === undefined ? "..." : ethBalance === null ? "Error" : `${parseFloat(formatEther(bnbBalance)).toPrecision(4)}`}</span></span>
            </h5>
		</div>
		)
}