import React, { useState,Component } from 'react';
import SelectPicker from 'react-native-form-select-picker'; // Import the package
//...
const options = ["Apple", "Banana", "Orange"];

export default class Locator extends Component {
    // ...

    render() {
        return (
            // ...

            <SelectPicker
                onValueChange={(value) => {
                    // Do anything you want with the value. 
                    // For example, save in state.
                    this.setState({
                        selected: value
                    })
                }}
                selected={this.state.selected}
                >
                ...
                <SelectPicker.Item label="Apple" value="apple" />    
                <SelectPicker.Item label="Banana" value="banana" />    
                <SelectPicker.Item label="Orange" value="orange" />    
                ...
            </SelectPicker>

            // ...
        )
    }

    // ...
}