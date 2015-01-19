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
            icon: "ion-ios-heart-outline ",
            functionCall: "highlightPanel",
            functionParams: "panel_favorites",
            classString: "slide col-xs-4 scroll-into-view",
            stackLength: 4,
            id: "panel_favorites",
            title: "My Favorites",
            items: [],
        }
    },

    render: function() {


        var favoriteNodes = this.props.favorites.map(function (favorite, i) {
          return <Favorite key={i.id} navStack={i+1} game={favorite.long} system={favorite.Platform} filepath={favorite.filepath} timestamp={ moment(favorite.timestamp, "YYYYMMDDhhmms").fromNow() } />
        });

        var nodes = favoriteNodes.length;

        return (

            <div className={this.props.classString} id={this.props.id}>
                <table className="scroll-into-view table navable scroll-into-view" data-function={this.props.functionCall} data-parameters={this.props.functionParams} id="panel_activity">
                    <thead>
                        <th>
                            <h4> <i className={this.props.icon}></i></h4>
                        </th>

                        <th colSpan='2'>
                          <h4 className="text-right">{this.props.title}</h4>
                        </th>
                    </thead>

                    <tbody className="scroll-into-view">

                       { nodes ? favoriteNodes  : <td><h2>No Favorites Set</h2></td> }

                    </tbody>

                    </table>
                </div>

        );
    }
});
