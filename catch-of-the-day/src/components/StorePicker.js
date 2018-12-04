import React from "react";
import { getFunName } from "../helpers";


class StorePicker extends React.Component {
  storeInput = React.createRef();

  goToStore = (event) => {
    event.preventDefault();
    const storeName = this.storeInput.value.value;
    this.props.history.push(`/store/${storeName}`);
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input
          type="text"
          required
          ref={this.storeInput}
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store</button>
      </form>
    );
  }
}

export default StorePicker;
