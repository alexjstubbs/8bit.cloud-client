/**
 * @jsx React.DOM
 */

var React = require('react/addons'),
    Favorite = require('./Favorite.jsx'),
    _ = require('lodash'),
    moment = require('moment');


module.exports = React.createClass({

    getDefaultProps: function() {

    return {
            favorites: [],
            navable: true,
            navStack: 3,
            icon: "ion-ios7-heart-outline ",
            functionCall: "highlightPanel",
            functionParams: "panel_favorites",
            classString: "slide col-md-4",
            stackLength: 4,
            id: "panel_favorites",
            title: "My Favorites",
            items: [],
        }
    },

    render: function() {

        var favoriteNodes = this.props.favorites.map(function (favorite, i) {
          return <Favorite key={i.id} navStack={i+1} game={favorite.game} system={favorite.system} timestamp={ moment(favorite.timestamp, "YYYYMMDDhhmms").fromNow() } />
        });

        return (

            <div className={this.props.classString} id={this.props.id}>
                <table className="table navable" data-function={this.props.functionCall} data-parameters={this.props.functionParams} id="panel_activity">
                    <thead>
                        <th>
                            <h4> <i className={this.props.icon}></i></h4>
                        </th>

                        <th colSpan='2'>
                          <h4 className="text-right">{this.props.title}</h4>
                        </th>
                    </thead>
                        
                   { favoriteNodes } 
                                          
                    </table>
                </div>              
         
        );
    }
});



