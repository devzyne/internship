import React from 'react'
import PropTypes from 'prop-types'

//components
import Searchbar from '../../components/searchbar/Searchbar'
import Chips from '../../components/chips/Chips'

//redux
import {connect} from 'react-redux'
import {deleteChips, toggleFilter, addChips} from '../../redux/actions/uiActions'
import {getSuggestions} from '../../redux/actions/dataActions'

//icons

import notificationIcon from '../../assets/notification_icon.svg'
import filterIcon from '../../assets/filter icon.svg'

//css
import './navbar.css'


const Navbar = ({chips, deleteChips, toggleFilter, autoSuggest, getSuggestions, addChips}) => {

    const onDelete = (item) => {
       deleteChips(item)
    }

    return(
        <nav className='toolbar container-fluid'>
            <nav className='toolbar-navigation container-fluid p-0'>
                
                <div className='container search'>
                    <Searchbar autoSuggest={autoSuggest} getSuggestions={getSuggestions} addChips={addChips} />
                </div>
                <div className='toolbar-navigation-items'>
                    <img src={notificationIcon} style={{height:'30px'}} alt='notification icon'/>
                    <img src={filterIcon} style={{height: '20px'}} onClick={toggleFilter} alt='filter icon' />
                </div>
            </nav>
            <div className='container chip-block'>
                {chips.map((chip, index) => (
                    <Chips chip={chip} key={index} onDelete={() => onDelete(chip)} />
                ))}
            </div>
        </nav>
    )
}

Navbar.propTypes = {
    deleteChips: PropTypes.func.isRequired,
    toggleFilter: PropTypes.func.isRequired,
    autoSuggest: PropTypes.array.isRequired,
    getSuggestions: PropTypes.func.isRequired,
    addChips: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    chips: state.UI.chips,
    autoSuggest: state.data.autoSuggest
})

const mapActionToProps = {
    deleteChips,
    toggleFilter,
    addChips,
    getSuggestions
}

export default connect(mapStateToProps, mapActionToProps)(Navbar)