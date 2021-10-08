import React, { useEffect, useState } from 'react'
import * as NearAPI from 'near-api-js'

const { utils }  = NearAPI

const TestNearWeb3 = () => {
    const [isConnected, setIsConnected] = useState(false)
    const [account, setAccount] = useState('')
    const [accountState, setAccountState] = useState('')

    const [viewFunction, setViewFuction] = useState('')


    useEffect(()=> {
        const isConnected = window.coin98?.near.isConnected();
        setIsConnected(isConnected)
    },[])

    const connect =  () => {
        window.coin98.near.connect(null,'app .nearcrowd.near');
    }

    const getAccount = () => {
        const account = window.coin98?.near.selectedAddress;
        setAccount(account)
    }

    const getAccountState = async () => {
        const accountState = await window.coin98?.near.request({method: 'near_accountState'})
        setAccountState(accountState)
    }

    const getAccountBalance = async () => {
        
    }

    const nearView = async () => {
        const params = {
            contractId: 'token.v2.ref-finance.near',
            method: 'ft_balance_of',
            args: {
                account_id: account
            }
        }
        const result = await window.coin98?.near.request({method: 'near_view', params})
        setViewFuction(result)
    }

    const signAndSend = async  () => {

        const transactions = []

        //Call contract method
        // const call_contract_method = {
        //     action: 'call',
        //     method: '',
        //     args: {},
        //     gas: utils.format.parseNearAmount("0.1"),
        //     amount: utils.format.parseNearAmount("0.1")
        // }


        // transactions.push(call_contract_method)

        const transfer_txs = {
            action: 'transfer',
            amount: utils.format.parseNearAmount("0.1")
        }

        transactions.push(transfer_txs)

        // const delete_account = {
        //     action: 'delete',
        // }

        // transactions.push(delete_account)
        

        const params = {
            transactions,
            receiver: account
        }

        const result = await window.coin98?.near.request({method: 'near_signAndSendTransaction', params})
        alert(result)
    }

    return(
        <div className="wrapper">
            <div className="connect-status">
            isConnected: {JSON.stringify(isConnected)}
            </div>


            <div className="connection">
                <button onClick={connect}>Connect</button>
            </div>
            <div className="getAccountInfo">
                <button disabled={!isConnected} onClick={getAccount}>Get Address</button>
                <div className="info">
                    account: {account}
                </div>
            </div>
            <div className="near">
                <button disabled={!account} onClick={getAccountState}>GET Account State</button>
                <div className="info">
                    account State: {JSON.stringify(accountState)}
                </div>
            </div>

            <div className="near">
                <button disabled={!account} onClick={nearView}>View Function</button>
                <div>
                    Ref Finance Balance: {viewFunction}
                </div>
            </div>

            <div className="testSendTransaction">
                <button onClick={signAndSend}>Sign &amp; Send Transaction</button>
            </div>

        </div>
    )
}

export default TestNearWeb3