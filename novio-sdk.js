'use strict';

class Novio {
    constructor() {
        this.Connected = new Promise((resolve) => {
            document.addEventListener('onNovioConnected', function (event) {
                resolve();
            });
        });
        this.Disconnected = new Promise((resolve) => {
            document.addEventListener('onNovioDisconnected', function (event) {
                resolve();
            });
        });
    };

    transferTo(toAddress, amount, attrs) {
        return this.sendTransactionRequest('transferTo', [toAddress, amount, attrs]);
    }
    registerName(name, attrs) {
        return this.sendTransactionRequest('registerName', [name, attrs]);
    }

    transferName(name, recipient, attrs) {
        return this.sendTransactionRequest('transferName', [name, recipient, attrs]);
    }

    deleteName(name, attrs) {
        return this.sendTransactionRequest('deleteName', [name, attrs]);
    }

    subscribe(topic, duration, identifier, meta, attrs) {
        return this.sendTransactionRequest('subscribe', [topic, duration, identifier, meta, attrs]);
    }

    unsubscribe(topic, identifier, attrs) {
        return this.sendTransactionRequest('unsubscribe', [topic, identifier, attrs]);
    }

    sendTransactionRequest(type, data) {

        const txRequestEvent = new CustomEvent("onNovioTxRequest", {
            bubbles: true,
            cancelable: false,
            detail: {
                type: type,
                data: data
            },
        });
        document.dispatchEvent(txRequestEvent);

        return new Promise((resolve, reject) => {
            window.addEventListener("onNovioTxResponse", (event) => {
                if (event.detail.data.error) {
                    reject(event.detail.data.error);
                } else {
                    resolve(event.detail);
                }
            }, false);
        })
    }
}
