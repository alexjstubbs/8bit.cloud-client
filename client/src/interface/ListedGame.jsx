/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons'),
    _     = require('lodash');

module.exports = React.createClass({

    getDefaultProps: function() {
        return {
                navable: false,
                subNavable: true,
                navStack: 1,
                functionCall: "largeProfile",
                functionParams: null,
                game: null,
                alpha: "."
            }
    },

    render: function() {

        return (

                <tr className='subNavable' data-snav={this.props.navStack} data-function={this.props.functionCall} data-parameters={this.props.path} data-title={this.props.game} data-path={this.props.path} data-total={this.props.total}>
                    <td data-tdalpha='alpha_selection'>
                        <div className='left_alpha pull-left'>{this.props.alpha}</div>
                        <a className='launch' data-ref={this.props.navStack} data-game={this.props.game} href='#'>{this.props.game}</a>
                    </td>
                </tr>
        )
    }
});
