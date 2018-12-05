import React from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import base, { firebaseApp } from "../base"
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";

class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    addFish: PropTypes.func,
    loadFishes: PropTypes.func
  }

  state = {
    uid: null,
    owner: null
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.authHandler({ user });
      }
    })
  }

  authHandler = async authData  => {
    //Lookup the current store in firebase db
    const store = await base.fetch(this.props.storeId, {context: this});
    //claim it if there is no owner
    if(!store.owner){
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      });
    }
    //set the state of the inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    })
    console.log(store);
  };

  authenitcate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  }

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({ uid: null });
  }

  render() {
    const logout = <button onClick= {this.logout}>Logout</button>
    //check if user logged in
    if(!this.state.uid) {
      return <Login authenticate = {this.authenitcate} />;
    }
    //check if they are owner of store
    if(this.state.uid !== this.state.owner){
      return (
        <div>
          <p>Sorry you are not the owner!</p>
          {logout}
        </div>
      );
    }
    //render the inventory for owners
    return (
      <div className="inventory">
        {logout}
        <h2>Inventory</h2>
        {Object.keys(this.props.fishes).map(key => <EditFishForm key={key} index={key} 
        fish = {this.props.fishes[key]} updateFish={this.props.updateFish}
        deleteFish = {this.props.deleteFish}/>)}
        <AddFishForm addFish = {this.props.addFish}/>
        <button onClick={this.props.loadFishes}>Load Sample Fishes</button>
      </div>
    );
  }
}

export default Inventory;
