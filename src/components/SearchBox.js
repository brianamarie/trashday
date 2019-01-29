import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';


const bounds = new window.google.maps.LatLngBounds(
  new window.google.maps.LatLng(54.69726685890506, -2.7379201682812226),
  new window.google.maps.LatLng(55.38942944437183, -1.2456105979687226)
)
const searchOptions = {
  bounds,
  strictBounds: true
}

class SearchBar extends React.Component {
  state = {
    address: this.props.address ? this.props.address : '',
    searchOptions
  }

  handleSelect = address => {
    this.setState({ address });
    this.props.setAddress(address);
  }

  handleChange = address => {
    this.setState({ address })
  }

  render() {
    const renderSuggestion = ({ suggestion }) => (
      <div>{suggestion}</div>
    );
    
    const shouldFetchSuggestions = ({ value }) => value.length > 2;
    
    // const onError = (status, clearSuggestions) => {
    //   console.log(
    //     'Error while fetching suggestions from API',
    //     status
    //   )
    //   clearSuggestions();
    // }

    const inputProps = {
      type: 'text',
      value: this.state.address,
      onChange: this.handleChange,
      autoFocus: true,
      placeholder: 'What is your address?'
    }

    return (
      <div className="searchbox">
        <PlacesAutocomplete
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          onSelect={this.handleSelect}
          onEnterKeyDown={this.handleSelect}
          shouldFetchSuggestions={shouldFetchSuggestions}
          searchOptions={this.state.searchOptions}
        />
      </div>
    )
  }
}

export default SearchBar;