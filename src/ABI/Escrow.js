export const Abi = [
	  {
		"type": "constructor",
		"inputs": [
		  {
			"name": "_invoiceId",
			"type": "string",
			"internalType": "string"
		  },
		  {
			"name": "_buyer",
			"type": "address",
			"internalType": "address"
		  },
		  {
			"name": "_seller",
			"type": "address",
			"internalType": "address"
		  },
		  {
			"name": "_arbitrator",
			"type": "address",
			"internalType": "address"
		  },
		  {
			"name": "_erc20Token",
			"type": "address",
			"internalType": "address"
		  },
		  {
			"name": "_flatFee",
			"type": "uint256",
			"internalType": "uint256"
		  },
		  {
			"name": "_bps",
			"type": "uint256",
			"internalType": "uint256"
		  },
		  {
			"name": "_completionDuration",
			"type": "uint256",
			"internalType": "uint256"
		  }
		],
		"stateMutability": "nonpayable"
	  },
	  {
		"type": "function",
		"name": "approveExtension",
		"inputs": [],
		"outputs": [],
		"stateMutability": "nonpayable"
	  },
	  {
		"type": "function",
		"name": "calculatePenalty",
		"inputs": [],
		"outputs": [
		  {
			"name": "",
			"type": "uint256",
			"internalType": "uint256"
		  }
		],
		"stateMutability": "view"
	  },
	  {
		"type": "function",
		"name": "claimFunds",
		"inputs": [],
		"outputs": [],
		"stateMutability": "nonpayable"
	  },
	  {
		"type": "function",
		"name": "disputeData",
		"inputs": [],
		"outputs": [
		  {
			"name": "isDisputed",
			"type": "bool",
			"internalType": "bool"
		  },
		  {
			"name": "disputeInitiator",
			"type": "address",
			"internalType": "address"
		  },
		  {
			"name": "disputeTimestamp",
			"type": "uint256",
			"internalType": "uint256"
		  }
		],
		"stateMutability": "view"
	  },
	  {
		"type": "function",
		"name": "extensionData",
		"inputs": [],
		"outputs": [
		  {
			"name": "extensionDuration",
			"type": "uint256",
			"internalType": "uint256"
		  },
		  {
			"name": "extensionRequestTimestamp",
			"type": "uint256",
			"internalType": "uint256"
		  },
		  {
			"name": "extensionApprovedTimestamp",
			"type": "uint256",
			"internalType": "uint256"
		  },
		  {
			"name": "approvedExtensionDeadline",
			"type": "uint256",
			"internalType": "uint256"
		  }
		],
		"stateMutability": "view"
	  },
	  {
		"type": "function",
		"name": "fundEscrow",
		"inputs": [
		  {
			"name": "amount",
			"type": "uint256",
			"internalType": "uint256"
		  },
		  {
			"name": "_fee",
			"type": "uint256",
			"internalType": "uint256"
		  }
		],
		"outputs": [],
		"stateMutability": "nonpayable"
	  },
	  {
		"type": "function",
		"name": "getParties",
		"inputs": [],
		"outputs": [
		  {
			"name": "",
			"type": "address",
			"internalType": "address"
		  },
		  {
			"name": "",
			"type": "address",
			"internalType": "address"
		  },
		  {
			"name": "",
			"type": "address",
			"internalType": "address"
		  }
		],
		"stateMutability": "view"
	  },
	  {
		"type": "function",
		"name": "initiateDispute",
		"inputs": [],
		"outputs": [],
		"stateMutability": "nonpayable"
	  },
	  {
		"type": "function",
		"name": "invoiceId",
		"inputs": [],
		"outputs": [
		  {
			"name": "",
			"type": "string",
			"internalType": "string"
		  }
		],
		"stateMutability": "view"
	  },
	  {
		"type": "function",
		"name": "markReady",
		"inputs": [],
		"outputs": [],
		"stateMutability": "nonpayable"
	  },
	  {
		"type": "function",
		"name": "openDisputeForExtension",
		"inputs": [],
		"outputs": [],
		"stateMutability": "nonpayable"
	  },
	  {
		"type": "function",
		"name": "releaseFunds",
		"inputs": [],
		"outputs": [],
		"stateMutability": "nonpayable"
	  },
	  {
		"type": "function",
		"name": "requestExtension",
		"inputs": [
		  {
			"name": "_extensionDuration",
			"type": "uint256",
			"internalType": "uint256"
		  }
		],
		"outputs": [],
		"stateMutability": "nonpayable"
	  },
	  {
		"type": "function",
		"name": "resolveDispute",
		"inputs": [
		  {
			"name": "refundAmount",
			"type": "uint256",
			"internalType": "uint256"
		  },
		  {
			"name": "releaseAmount",
			"type": "uint256",
			"internalType": "uint256"
		  }
		],
		"outputs": [],
		"stateMutability": "nonpayable"
	  },
	  {
		"type": "function",
		"name": "state",
		"inputs": [],
		"outputs": [
		  {
			"name": "currentStatus",
			"type": "uint8",
			"internalType": "enum Flexiscrow.EscrowStatus"
		  },
		  {
			"name": "previousStatus",
			"type": "uint8",
			"internalType": "enum Flexiscrow.EscrowStatus"
		  },
		  {
			"name": "escrowAmount",
			"type": "uint256",
			"internalType": "uint256"
		  },
		  {
			"name": "readyTimestamp",
			"type": "uint256",
			"internalType": "uint256"
		  }
		],
		"stateMutability": "view"
	  },
	  {
		"type": "function",
		"name": "timeConfig",
		"inputs": [],
		"outputs": [
		  {
			"name": "completionDuration",
			"type": "uint256",
			"internalType": "uint256"
		  },
		  {
			"name": "deadline",
			"type": "uint256",
			"internalType": "uint256"
		  },
		  {
			"name": "originalDeadline",
			"type": "uint256",
			"internalType": "uint256"
		  }
		],
		"stateMutability": "view"
	  },
	  {
		"type": "event",
		"name": "DisputeInitiated",
		"inputs": [
		  {
			"name": "initiator",
			"type": "address",
			"indexed": false,
			"internalType": "address"
		  },
		  {
			"name": "reason",
			"type": "string",
			"indexed": false,
			"internalType": "string"
		  }
		],
		"anonymous": false
	  },
	  {
		"type": "event",
		"name": "DisputeResolved",
		"inputs": [
		  {
			"name": "refundAmount",
			"type": "uint256",
			"indexed": false,
			"internalType": "uint256"
		  },
		  {
			"name": "releaseAmount",
			"type": "uint256",
			"indexed": false,
			"internalType": "uint256"
		  }
		],
		"anonymous": false
	  },
	  {
		"type": "event",
		"name": "EscrowFunded",
		"inputs": [
		  {
			"name": "amount",
			"type": "uint256",
			"indexed": false,
			"internalType": "uint256"
		  }
		],
		"anonymous": false
	  },
	  {
		"type": "event",
		"name": "ExtensionApproved",
		"inputs": [
		  {
			"name": "approvedTimestamp",
			"type": "uint256",
			"indexed": false,
			"internalType": "uint256"
		  },
		  {
			"name": "newDeadline",
			"type": "uint256",
			"indexed": false,
			"internalType": "uint256"
		  }
		],
		"anonymous": false
	  },
	  {
		"type": "event",
		"name": "ExtensionRequested",
		"inputs": [
		  {
			"name": "extensionDuration",
			"type": "uint256",
			"indexed": false,
			"internalType": "uint256"
		  },
		  {
			"name": "requestTimestamp",
			"type": "uint256",
			"indexed": false,
			"internalType": "uint256"
		  }
		],
		"anonymous": false
	  },
	  {
		"type": "event",
		"name": "FundsRefunded",
		"inputs": [
		  {
			"name": "amount",
			"type": "uint256",
			"indexed": false,
			"internalType": "uint256"
		  }
		],
		"anonymous": false
	  },
	  {
		"type": "event",
		"name": "FundsReleased",
		"inputs": [
		  {
			"name": "amount",
			"type": "uint256",
			"indexed": false,
			"internalType": "uint256"
		  },
		  {
			"name": "penalty",
			"type": "uint256",
			"indexed": false,
			"internalType": "uint256"
		  }
		],
		"anonymous": false
	  },
	  {
		"type": "event",
		"name": "MarkedReady",
		"inputs": [
		  {
			"name": "timestamp",
			"type": "uint256",
			"indexed": false,
			"internalType": "uint256"
		  }
		],
		"anonymous": false
	  },
	  {
		"type": "error",
		"name": "AlreadyFunded",
		"inputs": []
	  },
	  {
		"type": "error",
		"name": "DeadlineNotReached",
		"inputs": []
	  },
	  {
		"type": "error",
		"name": "ExtensionNotRequested",
		"inputs": []
	  },
	  {
		"type": "error",
		"name": "ExtensionResponseTimeNotPassed",
		"inputs": []
	  },
	  {
		"type": "error",
		"name": "InvalidArbitratorAddress",
		"inputs": []
	  },
	  {
		"type": "error",
		"name": "InvalidBuyerOrSellerAddress",
		"inputs": []
	  },
	  {
		"type": "error",
		"name": "InvalidERC20TokenAddress",
		"inputs": []
	  },
	  {
		"type": "error",
		"name": "InvalidExtensionDuration",
		"inputs": []
	  },
	  {
		"type": "error",
		"name": "InvalidFee",
		"inputs": []
	  },
	  {
		"type": "error",
		"name": "InvalidSettlementAmounts",
		"inputs": []
	  },
	  {
		"type": "error",
		"name": "InvalidStatus",
		"inputs": []
	  },
	  {
		"type": "error",
		"name": "NoActiveDispute",
		"inputs": []
	  },
	  {
		"type": "error",
		"name": "NoExtensionRequested",
		"inputs": []
	  },
	  {
		"type": "error",
		"name": "NotInProgress",
		"inputs": []
	  },
	  {
		"type": "error",
		"name": "NotReadyForRelease",
		"inputs": []
	  },
	  {
		"type": "error",
		"name": "OnlyArbitratorAllowed",
		"inputs": []
	  },
	  {
		"type": "error",
		"name": "OnlyBuyerAllowed",
		"inputs": []
	  },
	  {
		"type": "error",
		"name": "OnlySellerAllowed",
		"inputs": []
	  },
	  {
		"type": "error",
		"name": "SafeERC20FailedOperation",
		"inputs": [
		  {
			"name": "token",
			"type": "address",
			"internalType": "address"
		  }
		]
	  }
	]
  