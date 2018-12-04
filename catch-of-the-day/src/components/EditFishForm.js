import React from "react";

class EditFishForm extends React.Component {
  handleChange = event => {
    console.log(event.currentTarget.value);
    //Update that fish
    //1. take copy of the current fish
    const updatedFish = { 
      ...this.props.fish,
      [event.currentTarget.name]: event.currentTarget.value
    };
    this.props.updateFish(this.props.index, updatedFish);
  }

  render() {
    const fish = this.props.fish;
    return (
      <div className="fish-edit">
        <input type="text" name="name" value = {fish.name} onChange={this.handleChange}/>
        <input type="text" name="price" value={fish.price} onChange={this.handleChange}/>
        <select name="status" value={fish.status} onChange={this.handleChange}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          name="desc"
          ref={this.descRef}
          type="text"
          placeholder="Desc"
          value={fish.desc}
          onChange={this.handleChange}
        />
        <input type="text" name="image" value={fish.image} onChange={this.handleChange}/>
        <button name="deleteFish" onClick={() => this.props.deleteFish(this.props.index)} >Remove Fish</button>
      </div>
    );
  }
}

export default EditFishForm;