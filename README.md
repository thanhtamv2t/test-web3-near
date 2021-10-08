## connect
window.coin98.near.connect()

## check connection
window.coin98.near.isConnected()

## Get Address
window.coin98?.near.selectedAddress;

## Get Account State
window.coin98?.near.request({method: 'near_accountState'})

## Call View Method
```Javascript
const params = {
    contractId: 'token.v2.ref-finance.near',
    method: 'ft_balance_of',
    args: {
        account_id: account
    }
}
const result = await window.coin98?.near.request({method: 'near_view', params})```


## Sign And Send
```Javascript
const params = {
    transactions,
    receiver: account
}

const result = await window.coin98?.near.request({method: 'near_signAndSendTransaction', params})```
