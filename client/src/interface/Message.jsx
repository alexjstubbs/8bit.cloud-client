/**
* @jsx React.DOM
*/

var React           = require('react/addons'),
    _               = require('lodash'),
    NetworkStatus   = require('./NetworkStatus.jsx'),
    navigationInit  = require('../js/navigation.init'),
    UserAvatar      = require('./Avatar.jsx'),
    UserStatus      = require('./UserStatus.jsx'),
    helpers         = require('../js/helpers'),
    mixins          = require('./mixins/mixins.jsx'),
    moment          = require('moment'),
    image, invitationObj;

module.exports = React.createClass({

    // mixins: [mixins.listener],

    getInitialState: function() {
        return {
            message: null
        };
    },

    componentDidMount: function() {

            var readItems = [];

            // readItems.push(localStorage.getItem("read_messages"));
            // readItems.push(JSON.parse(this.props._id));
            //
            // localStorage.setItem("read_messages", _.compact(_.uniq(readItems)));


        // navigationInit.navigationInit();

    },

    getDefaultProps: function() {

        return {
            navable: true,
            navStack: 2,
            From: null,
            Avatar: <div className="col-xs-3 pull-left square dark-gray"><i className='ion-person'></i></div>,
            Body: "No Content",
            messageId: null,
            Type: "message"
        }

    },

    render: function() {

        console.log(this.props);

        if (helpers.isJSON(this.props.Invite)) {

            var obj = JSON.parse(this.props.Invite);
            image = "http://127.0.0.1:1210/games/"+obj.platform+"/"+obj.gameTitle;

            invitationObj = {
                invite    : obj,
                Username  : this.props.From,
                _id       : this.props._id,
                Timestamp : this.props.Timestamp
            }

        };

        var _moment  = moment(this.props.Timestamp, "YYYYMMDDhhmms").fromNow();

        return (

            <div className="parent">

                <div className="col-xs-12" className="full-message">

                    <div className="col-xs-1">
                        <UserAvatar username={this.props.From} />
                    </div>

                    <div className="col-xs-6">

                        <div className="no-padding no-margin">{this.props.From}</div><br />
                        <div className="mute down5">sent {_moment}</div>

                        <UserStatus Username={this.props.From} />
                        <br />

                    </div>

                    <div className="col-xs-5 text-right">
                        <h2>
                            {
                                this.props.Type == "message" ?

                                <span><i className="ion-ios-chatboxes-outline"></i> &nbsp; Message</span>

                            :

                                <span><i className="ion-ios-game-controller-b"></i> &nbsp; Invite</span>
                            }

                        </h2>
                    </div>


                    <div className="clearfix"></div>

                    <br />

                    {

                        this.props.Type == "message" ?


                        <div className="well-alt coll-xs-12 scrollable">
                            {this.props.Body}
                        </div>


                    :

                    <div className="well-alt coll-xs-12 scrollable">

                        <div className="col-xs-10">
                            {this.props.Body}
                        </div>

                        <div className="col-xs-2">
                            <img src={image} className="img-responsive" />
                        </div>

                        <div className="clearfix"></div>

                    </div>

                    }

                </div>

                <div className="clearfix"></div>

                <hr />

                <div className="pull-left">
                    <button className="navable btn btn-alt btn-alt-size" data-function="closeDialog"><i className="ion-close red"></i> &nbsp; Close Message</button>
                </div>

                {
                    this.props.Type == "message" ?

                <div className="pull-right">
                    <button className="navable btn btn-alt btn-alt-size" data-function="deleteMessage" data-parameters={this.props._id}><i className="ion-trash-a red"></i> &nbsp; Delete Message</button>
                    <button className="navable btn btn-alt btn-alt-size" data-function="passMessage" data-parameters={this.props.From}><i className="ion-reply green"></i> &nbsp; Reply</button>
                </div>

                :

                <div className="pull-right">
                    <button className="navable btn btn-alt btn-alt-size" data-function="declineInvite" data-parameters={this.props._id}><i className="ion-close red"></i> &nbsp; Decline Invite</button>
                    <button className="navable btn btn-alt btn-alt-size" data-function="acceptInvite" data-parameters={JSON.parse(invitationObj)}><i className="ion-checkmark green"></i> &nbsp; Accept</button>
                </div>

                }

            </div>

        );
    }
});
