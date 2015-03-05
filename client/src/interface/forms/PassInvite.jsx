/**
* @jsx React.DOM
*/

'use strict';

var React          = require('react/addons'),
    navigationInit = require('../../js/navigation.init'),
    mixins         = require('../mixins/mixins.jsx'),
    api            = require('socket.io-client')('/api'),
    Avatar         = require('../Avatar.jsx'),
    title;

module.exports = React.createClass({

    mixins: [mixins.listener],

    getInitialState: function() {
            return {
                "type"       : "message",
                "gameInfo"   : {},
                "updateGame" : {}
            };
    },

    getDefaultProps: function() {

        return {
            navable: true,
            form: 'passMessage',
            backdrop: true,
            server: "true",
            classList: 'col-xs-12'
        };
    },

    componentDidMount: function() {
        navigationInit.navigationInit();

        title = localStorage.getItem("gameInfo");
        title = JSON.parse(title);

        console.log(title);

    },

    render: function() {

        console.log(this.state);

        return (
            <div className="parent">

            <div className="col-xs-1 square purple-bg">
                <h2><i className="ion-ios-game-controller-b"></i></h2>
            </div>


            <form accept-charset="UTF-8" role="form" name={this.props.form} id={this.props.form}>

            <fieldset className="col-xs-11">

                <span className="col-xs-12">

                    <input className="form-control input-lg col-xs-6 pull-left" data-function='inputFocus' placeholder="Recipient Username" value={this.props.To} name="To" type="text" />

                    <div className="clearfix"></div>

                    <textarea data-function='inputFocus' name="Body" className='textarea-height navable scrollable form-control'>
                        Let's Play 
                    </textarea>

                </span>

            </fieldset>

            <div className="clearfix"></div>

            <hr />

            <div className="pull-right">

                <button className="btn btn-alt btn-alt-size navable" data-function='closeDialog'> <i className="ion-close red"></i> &nbsp; Cancel Game Invite</button>
                <button className="btn btn-alt btn-alt-size navable default-navable" data-function='submitForm' data-parameters={this.props.form}> <i className="ion-person-add green"></i> &nbsp; Send Game Invite</button>

            </div>

            <input type="hidden" name="Type" value={this.state.type} />
            <input type="hidden" name="server" value={this.props.server} />

            </form>

            </div>
        );
    }
});
