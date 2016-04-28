/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        alert('1234');

        if(typeof nfc !== 'undefined') {alert('1');} else {alert('2');}

        function failure(reason) {
            navigator.notification.alert(reason, function() {}, "There was a problem");
        }

        nfc.addNdefListener (
            app.onNdef,
            function () { // success callback
                alert("Waiting for NDEF tag");
            },
            function (error) { // error callback
                alert("Error adding NDEF listener " + JSON.stringify(error));
            }
        );

        if (device.platform == "Android") {

            // Android reads non-NDEF tag. BlackBerry and Windows don't.
            nfc.addTagDiscoveredListener(
                app.onNfc,
                function() {
                    console.log("Listening for non-NDEF tags.");
                },
                failure
            );

            nfc.addMimeTypeListener(
                '',
                app.onNdef,
                function () { // success callback
                    alert("Waiting for NDEF tag");
                },
                failure
            );

            nfc.addMimeTypeListener(
                'text/pg',
                app.onNdef,
                function () { // success callback
                    alert("Waiting for NDEF tag");
                },
                failure
            );
        }
    },
    onNfc: function (nfcEvent) {

        var tag = nfcEvent.tag;

        alert('122342432423');

        alert("onNfc: " + JSON.stringify(nfcEvent.tag) +  + ": message" + tag.ndefMessage);

        navigator.notification.vibrate(100);
    },
    onNdef: function (nfcEvent) {

        var tag = nfcEvent.tag;

        alert('fdsjifsdjkfhjsd');

        alert("onNdef: " + JSON.stringify(tag) + ": message" + tag.ndefMessage);

        navigator.notification.vibrate(100);
    },
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();