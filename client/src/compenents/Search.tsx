import React, { Component } from 'react'

export default class Search extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 query: '',
            }
        }

    handleInputChange = (e) => {
        this.setState(
            { query: e.target.value })
    }

    render() {
        return (
            <form>
                <input
                placeholder="Search"
                ref={input => this.state.search = input}
                onChange={this.handleInputChange}
                />
                <p>{this.state.query}</p>
            </form>
        )
    }
}