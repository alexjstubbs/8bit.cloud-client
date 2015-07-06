/**
 * @jsx React.DOM
 */

var React       = require('react/addons'),
    Favorite    = require('./Favorite.jsx'),
    _           = require('lodash'),
    moment      = require('moment');


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
        };
    },

    render: function() {

        var favoriteNodes = this.props.favorites.map(function (favorite, i) {
          return <Favorite key={i.id} platform={favorite.platform} shortname={favorite.shortname} navStack={i+1} game={favorite.long} system={favorite.Platform} filepath={favorite.filepath} timestamp={ moment(favorite.timestamp, "YYYYMMDDhhmms").fromNow() } />
        });

        var nodes = favoriteNodes.length;
        // favoriteNodes = favoriteNodes.reverse();

        return (

            <div className={this.props.classString} id={this.props.id}>
                <table className="table navable scroll-into-view" data-function={this.props.functionCall} data-parameters={this.props.functionParams} id="panel_activity">
                    <thead>
                        <th className="pull-right">
                            <h4> <i className={this.props.icon}></i></h4>
                        </th>

                        <th className="col-xs-11 text-right">
                          <h4 className="text-right">{this.props.title}</h4>
                        </th>
                    </thead>

                    <tbody className="scroll-into-view">

                       { nodes ? favoriteNodes  : <td colSpan="2"><h2>No Favorites Set</h2></td> }

                    </tbody>

                    </table>
                </div>

        );
    }
});
