/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');

module.exports = React.createClass({

    getDefaultProps: function() {
    return {
            navable: true,
            navStack: 4,
            icon: "ion-ios7-people-outline ",
            myMessages: [],
            newMessages: false,
            messageCount: 0,
            shortcutKey: "F9",
            functionCall: "community",
            classString: "slide col-md-4",
            title: "Community",
            id: "panel_community",
            imageStyles: null
        }
    },
    render: function() {

        var imageStyles = this.props.imageStyles;

        return (
         <div className={this.props.classString}>

         <table className="table table-striped navable" data-function={this.props.functionCall} id={this.props.id}>
                          
             <thead>
                    <th>
                        <h4> <i className={this.props.icon}></i></h4>
                    </th>

                    <th colSpan='2'>
                        <h4 className="text-right">{this.props.title}</h4>
                    </th>
             </thead>
                
            <tr>
                <td colSpan='2' className="rss_image"><br />                        
                  <span className="rImg"><img src={this.props.image} className='img-responsive' style={JSON.parse(imageStyles)} /></span>
                </td>
            </tr>

            <tr>
                <td colSpan='2' id="rss_info">
                    <br />
                    <h4 className="rss_title pull-left"><i className='ion-speakerphone'></i> {this.props.subtitle}</h4>
                    <span className="rss_author pull-right"></span>
                </td>
            </tr>

        </table>
        </div>


        );
    }
});

// 