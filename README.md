# Novio SDK
Javascript implementation for novio website integration.
This SDK allows for websites to request transactions to be signed from the novio wallet extension.

## Usage
### Include
	//Include the sdk script
    <script src="novio-sdk.js"></script>
    
    //Instantiate
    var novio = new Novio();
    
### Promises
When you instantiate the novio-sdk no connection will be active with the client extension, this is for security reasons, the connection will only be established as soon as the user opens the extension on your page. Making any transaction requests before a wallet is connected will not yield any results. 

Similarly when the disconnected promise is resolved no more transaction requests can be made, at this point a new novio instance should be instantiated and the user should be prompted once more to open their wallet.

	//Connected is a promise for when a novio wallet is successfully connected
	novio.Connected.then(() => {}

	//Disconnected is a promise for when the connected novio wallet is disconnected
	novio.Disconnected.then(() => {}

### Wallet transaction methods
The novio sdk and subsequently the novio wallet extension fully expose the nkn wallet functionality, this allows for your website to request transactions to be signed by the user.

	novio.transferTo(address, amount, attributes);
	novio.registerName(name, attributes);
	novio.transferName(name, recipientPublicKey, attributes);
	novio.deleteName(name, attributes);
	novio.subscribe(topic, duration, identifier, meta, attributes);
	novio.unsubscribe(topic, attributes);

Attributes is an optional field which can be used to uniquely identfiy a request challenge, for example if you want to create a payment integration flow, it is useful to provide a unique identifier for this transaction, so that you can confirm the transaction returned contains this unique identifier to verify the payment is for this exact request.

### Handling transaction promises
Each transaction request call returns a promise, this promise can yied both a successful resolve or a failed reject. For successfully resolved transactions the type of transaction and transaction hash are returned, for a failed reject the error message is returned.

	novio.transferTo(nknAddress, 50).then((result) => {
		alert(result);
	}).catch((error) => {
		alert(error);
	})
