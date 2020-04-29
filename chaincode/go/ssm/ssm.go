// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
// Copyright Luc Yriarte <luc.yriarte@thingagora.org> 2018 
// License: Apache-2.0
//
// Signing State Machines chaincode
//
// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

package main

import (
	"errors"
	"strings"
	"fmt"
	"encoding/json"

	"github.com/hyperledger/fabric-chaincode-go/shim"
	pb "github.com/hyperledger/fabric-protos-go/peer"
)


// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
//
// chaincode interface
//
// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

type SSMChaincode struct {
}


//
// chaincode initialization
//

func (self *SSMChaincode) Init(stub shim.ChaincodeStubInterface) pb.Response {
	_, args := stub.GetFunctionAndParameters()
	if len(args) != 1 {
		return shim.Error("Incorrect arg count. Expecting 1")
	}

	// "init", admins: <Agent>* 
	var admins []Agent
	// Create admins array from JSON string
	err := json.Unmarshal([]byte(args[0]), &admins)
	if (err != nil) {
		return shim.Error(err.Error())
	}
	// Verify admins public key before storing
	for i := 0; i < len(admins); i++ {
		_, err = admins[i].PublicKey()
		if err != nil {
			return shim.Error(err.Error())
		}
	}
	for i := 0; i < len(admins); i++ {
		// Store every admin
		err = admins[i].Put(stub, "ADMIN_" + admins[i].Name)
		if (err != nil) {
			return shim.Error(err.Error())
		}
	}
	
	// Upgrade DB
	err = self.UpgradeDB(stub)
	if (err != nil) {
		return shim.Error(err.Error())
	}
	
	return shim.Success(nil)
}


//
// chaincode invocation for transactions and queries
//

func (self *SSMChaincode) Invoke(stub shim.ChaincodeStubInterface) pb.Response {
	function, args := stub.GetFunctionAndParameters()
	
	errmsg := "Incorrect arg count."
	var err error	
	
	//
	//	transactions
	//
	
	// "register", user:Agent, admin_name:string, signature:b64	
	if function == "register" {
		if len(args) != 3 {
			return shim.Error(errmsg)
		}
		err = self.Verify(stub, args, "ADMIN")
		if (err != nil) {
			err = self.CheckGrants(stub, args, function)
			if (err != nil) {
				return shim.Error(err.Error())
			}
		}
		return self.Register(stub, args)
	}

	// "create", ssm:SigningStateMachine, admin_name:string, signature:b64
	if function == "create" {
		if len(args) != 3 {
			return shim.Error(errmsg)
		}
		err = self.Verify(stub, args, "ADMIN")
		if (err != nil) {
			err = self.CheckGrants(stub, args, function)
			if (err != nil) {
				return shim.Error(err.Error())
			}
		}
		return self.Create(stub, args)
	}
	
	// "start", init:State, admin_name:string, signature:b64
	if function == "start" {
		if len(args) != 3 {
			return shim.Error(errmsg)
		}
		err = self.Verify(stub, args, "ADMIN")
		if (err != nil) {
			err = self.CheckGrants(stub, args, function)
			if (err != nil) {
				return shim.Error(err.Error())
			}
		}
		return self.Start(stub, args)
	}
	
	// "limit", context:State, admin_name:string, signature:b64
	if function == "limit" {
		if len(args) != 3 {
			return shim.Error(errmsg)
		}
		err = self.Verify(stub, args, "ADMIN")
		if (err != nil) {
			return shim.Error(err.Error())
		}
		return self.Limit(stub, args)
	}
	
	// "grant", rights:Grant, admin_name:string, signature:b64
	if function == "grant" {
		if len(args) != 3 {
			return shim.Error(errmsg)
		}
		err = self.Verify(stub, args, "ADMIN")
		if (err != nil) {
			return shim.Error(err.Error())
		}
		return self.Grant(stub, args)
	}
	
	// "perform", action:string, context:State, user_name:string, signature:b64
	if function == "perform" {
		if len(args) != 4 {
			return shim.Error(errmsg)
		}
		err = self.Verify(stub, args, "USER")
		if (err != nil) {
			return shim.Error(err.Error())
		}
		return self.Perform(stub, args)
	}
	
	//
	//	queries
	//

	if len(args) != 1 {
		return shim.Error(errmsg)
	}
	errmsg = "Unknown operation."
	var dat []byte
	
	if function == "session" {
	// "session", <session id> 
		dat, err = stub.GetState("STATE_" + args[0])
	} else if function == "ssm" {
	// "ssm", <ssm name> 
		dat, err = stub.GetState("SSM_" + args[0])
	} else if function == "user" {
	// "user", <user name>
		dat, err = stub.GetState("USER_" + args[0])
	} else if function == "credits" {
	// "credits", <user name>
		dat, err = stub.GetState("GRANT_" + args[0])
	} else if function == "admin" {
	// "admin", <admin name>
		dat, err = stub.GetState("ADMIN_" + args[0])
	} else 	if function == "list" {
	// "list", <session|ssm|user|admin>
		var lst []string
		pre := strings.ToUpper(args[0]) + "_"
		if args[0] == "session" {
			pre = "STATE_"
		}
		itr, _ := stub.GetStateByRange(" ", "~")
		defer itr.Close()
		for itr.HasNext() {
			key, _ := itr.Next()
			if strings.HasPrefix(key.Key, pre) {
				lst = append(lst, "\"" + strings.TrimPrefix(key.Key, pre) + "\"")
			}
		}
		dat = []byte("[" + strings.Join(lst,",") + "]")
	} else 	if function == "log" {
	// "log", <session id>
		var lst []string
		itr, _ := stub.GetHistoryForKey("STATE_" + args[0])
		defer itr.Close()
		for itr.HasNext() {
			key, _ := itr.Next()
			lst = append(lst, "{\"txId\": \"" + key.GetTxId() + "\", \"state\": " + string(key.GetValue()) + "}")
		}
		dat = []byte("[" + strings.Join(lst,",") + "]")
	} else {
		return shim.Error(errmsg)
	}
	
	if (err != nil) {
		return shim.Error(err.Error())
	}
	
	return shim.Success(dat)
}


// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
//
// transactions API implementation
//
// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

// "register", user:Agent, admin_name:string, signature:b64	
func (self *SSMChaincode) Register(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	var err error	
	var user Agent
	// Create user from JSON string
	err = user.Deserialize([]byte(args[0]))
	if (err != nil) {
		return shim.Error(err.Error())
	}
	// Verify user public key before storing
	_, err = user.PublicKey()
	if err != nil {
		return shim.Error(err.Error())
	}
	// Store user if not alreay existing
	key := "USER_" + user.Name
	err = self.CheckUnique(stub, key)
	if (err != nil) {
		return shim.Error(err.Error())
	}
	err = user.Put(stub, key)
	if (err != nil) {
		return shim.Error(err.Error())
	}
	return shim.Success(nil)
}


// "create", ssm:SigningStateMachine, admin_name:string, signature:b64
func (self *SSMChaincode) Create(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	var err error	
	var ssm SigningStateMachine
	// Create ssm from JSON string
	err = ssm.Deserialize([]byte(args[0]))
	if (err != nil) {
		return shim.Error(err.Error())
	}
	// Store ssm if not alreay existing
	key := "SSM_" + ssm.Name
	err = self.CheckUnique(stub, key)
	if (err != nil) {
		return shim.Error(err.Error())
	}	
	err = ssm.Put(stub, key)
	if (err != nil) {
		return shim.Error(err.Error())
	}
	return shim.Success(nil)
}


// "start", init:State, admin_name:string, signature:b64
func (self *SSMChaincode) Start(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	var err error	
	var state State
	// Create state from JSON string
	err = state.Deserialize([]byte(args[0]))
	if (err != nil) {
		return shim.Error(err.Error())
	}
	// Store state if not alreay existing
	key := "STATE_" + state.Session
	err = self.CheckUnique(stub, key)
	if (err != nil) {
		return shim.Error(err.Error())
	}	
	err = state.Put(stub, key)
	if (err != nil) {
		return shim.Error(err.Error())
	}
	return shim.Success(nil)
}


// "limit", context:State, admin_name:string, signature:b64
func (self *SSMChaincode) Limit(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	var err error	
	var update State
	// Create state update from JSON string
	err = update.Deserialize([]byte(args[0]))
	if (err != nil) {
		return shim.Error(err.Error())
	}
	// Get the session state referenced in the update
	var session State
	err = session.Get(stub, "STATE_" + update.Session)
	if (err != nil) {
		return shim.Error(err.Error())
	}
	// Let the current session update its state with the new limit
	err = session.SetLimit(&update)
	if (err != nil) {
		return shim.Error(err.Error())
	}
	// Save the session state
	err = session.Put(stub, "STATE_" + session.Session)
	if (err != nil) {
		return shim.Error(err.Error())
	}
	return shim.Success(nil)
}


// "grant", rights:Grant, admin_name:string, signature:b64
func (self *SSMChaincode) Grant(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	var err error	
	var update Grant
	// Create grant update from JSON string
	err = update.Deserialize([]byte(args[0]))
	if (err != nil) {
		return shim.Error(err.Error())
	}
	// Get the user referenced by the grant update
	var user Agent
	err =  user.Get(stub, "USER_" + update.User)
	if (err != nil) {
		return shim.Error(err.Error())
	}
	// Get the user grant to update if any
	var grant Grant
	err = grant.Get(stub, "GRANT_" + update.User)
	if (err != nil) {
		// No preexisting grant, use the update for current grant
		grant = update
	}
	// Let the current grant update its credits with the new grant
	err = grant.SetCredits(&update)
	if (err != nil) {
		return shim.Error(err.Error())
	}
	// Save the user grant
	err = grant.Put(stub, "GRANT_" + grant.User)
	if (err != nil) {
		return shim.Error(err.Error())
	}
	return shim.Success(nil)
}


// "perform", action:string, context:State, user_name:string, signature:b64
func (self *SSMChaincode) Perform(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	var err error	
	var update State
	// Create state update from JSON string
	err = update.Deserialize([]byte(args[1]))
	if (err != nil) {
		return shim.Error(err.Error())
	}
	// Get the session state referenced in the update
	var session State
	err = session.Get(stub, "STATE_" + update.Session)
	if (err != nil) {
		return shim.Error(err.Error())
	}
	// Get the user's role in the current session
	role := session.Roles[args[2]]
	if (role == "") {
		return shim.Error("No role for user " + args[2] + " in session " + session.Session)
	}
	// Get the SSM for the current session
	var ssm SigningStateMachine
	err = ssm.Get(stub, "SSM_" + session.Ssm)
	if (err != nil) {
		return shim.Error(err.Error())
	}
	// Get the next state for the proposed transition
	update.Current = ssm.NextState(session.Current, role, args[0])
	if (update.Current == -1) {
		return shim.Error("No valid transition from state " + string(session.Current))
	}
	// Let the current session validate and perform the update
	err = session.Perform(&update, role, args[0])
	if (err != nil) {
		return shim.Error(err.Error())
	}
	// Save the updated state for the current session
	err = session.Put(stub, "STATE_" + session.Session)
	if (err != nil) {
		return shim.Error(err.Error())
	}	
	return shim.Success(nil)
}



// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
//
// utilities
//
// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

// agent signature verification
func (self *SSMChaincode) Verify(stub shim.ChaincodeStubInterface, args []string, agentType string) error {
	// Need at least 3 args: message, verifier, signature
	argCount := len(args)
	if argCount < 3 {
		return errors.New("Incorrect arg count. Expecting 3 or more")
	}
	// Verifier agent type is either "USER" or "ADMIN"
	var verifier Agent
	err :=  verifier.Get(stub, agentType + "_" + args[argCount - 2])
	if (err != nil) {
		return err
	}
	// message to verify is args 0 to n-3
	message := args[0]
	for i := 1; i < argCount-2; i++ {
		message += args[i]
	}
	return verifier.Verify(message, args[argCount - 1])
}	

// user grants verification
func (self *SSMChaincode) CheckGrants(stub shim.ChaincodeStubInterface, args []string, api string) error {
	// user signature verification
	err := self.Verify(stub, args, "USER")
	if (err != nil) {
		return err
	}
	// Get user name from args
	user := args[len(args) - 2]
	// Get the user grant
	var grant Grant
	err = grant.Get(stub, "GRANT_" + user)
	if (err != nil) {
		return err
	}
	// Let grant verify and update credits
	err = grant.ApiGrant(user, api)
	if (err != nil) {
		return err
	}
	// Save the updated grants
	err = grant.Put(stub, "GRANT_" + user)
	if (err != nil) {
		return err
	}	
	// All done
	return nil
}



// ensure a key is not already in use
func (self *SSMChaincode) CheckUnique(stub shim.ChaincodeStubInterface, key string) error {
	data, err := stub.GetState(key);
	if (err != nil) {
		return err
	}	
	if (data != nil) {
		return errors.New("Identifier " + key + " already in use.")
	}
	return nil
}


// Object read/rewrite for DB upgrade
func (self *SSMChaincode) ObjectRewrite(stub shim.ChaincodeStubInterface, obj Storable, key string) error {
	err := obj.Get(stub, key)
	if (err != nil) {
		return err
	}
	err = obj.Put(stub, key)
	return err
}

// Upgrade DB
func (self *SSMChaincode) UpgradeDB(stub shim.ChaincodeStubInterface) error {
	// Add docType to all models
	itr, err := stub.GetStateByRange(" ", "~")
	if (err != nil) {
		return err
	}
	defer itr.Close()
	for itr.HasNext() {
		key, _ := itr.Next()
		if strings.HasPrefix(key.Key, "USER") || strings.HasPrefix(key.Key, "ADMIN")  {
			var obj Agent
			err = self.ObjectRewrite(stub, &obj, key.Key)
		} else if strings.HasPrefix(key.Key, "GRANT") {
			var obj Grant
			err = self.ObjectRewrite(stub, &obj, key.Key)
		} else if strings.HasPrefix(key.Key, "STATE") {
			var obj State
			err = self.ObjectRewrite(stub, &obj, key.Key)
		} else if strings.HasPrefix(key.Key, "SSM") {
			var obj SigningStateMachine
			err = self.ObjectRewrite(stub, &obj, key.Key)
		}
		if (err != nil) {
			return err
		}
	}
	return nil
}

// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
//
// main function
//
// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

func main() {
	err := shim.Start(new(SSMChaincode))
	if err != nil {
		fmt.Println("Signing State Machines Chaincode init error:", err)
	}
}
