import { Component,ViewEncapsulation,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import { SolarService } from '../../services/solar.service';
import { Solar } from '../../models/solar.model';
import {DataTableModule,SharedModule} from 'primeng/primeng';

@Component({
    templateUrl: "./marketplace.html",
})

export class marketplaceComponent implements OnInit{
    model: any = {};
    result : any;
    token : any;
    public message = '';
    private toasterService: ToasterService;
    isLoading: boolean = false;
    pageLinks:any;
    rowsPerPageOptions: number[] = [];
    perPage:number=0;  
    recordsPerPage:number=25;
    //center:any;
    mapTypeId:any;
    private map: any;
    markers:any;
    //marker:any;
    marks:any;
    icon:string;
    checked:any;
    windowContent:any;
    public totalRecords:number;
    public sum: number;

    constructor(private router: Router,private solarService: SolarService, toasterService: ToasterService) { 
        this.toasterService = toasterService;
    }

    ngOnInit(){
        $('#mydiv').show();
        this.solarService.getSolarProjects(<Solar>this.model).subscribe(result => {  
            this.result = result.data;
            this.totalRecords=this.result.length;   
            this.sum = 20;
            
            //console.log(this.result);
            this.markers=result.markers;
            this.marks=result.marknew;
            this.windowContent=result.infowindow;
            this.pageLinks=Math.ceil(result.data.length/this.recordsPerPage);
            for (let i=1; i<=this.pageLinks; i++) {
                this.perPage=this.perPage+this.recordsPerPage;
                this.rowsPerPageOptions.push(this.perPage);
            }
            $('#mydiv').hide();
            if (this.result.length > 0) {
                /********************* MAP START **************************/
                var markers;
                markers=this.marks;
                //alert(this.marks);
               // markers = [
                //['28 kW Roof Mount - #940591',,,'0'],
                //['800 kW Roof Mount - #99759',,,'0'],['282kW - Commercial Ground Mount Solar Project - Cherokee, AL - Opportunity 73860',,,'0'],['32 kW Roof Mount - #143427',,,'0'],['20 kW Roof Mount - #147430',,,'0'],['26 kW Roof Mount - #73483',,,'0'],['100 kW Roof Mount - #72990',,,'0'],['64 kW Roof Mount - #73470',,,'0'],['26.5 kW Roof Mount - #83049',,,'0'],['118 kW Roof Mount - #122516',,,'0'],['49 kW Roof Mount - #121715',,,'0'],['61 kW Ground Mount - #120215',,,'0'],['482 kW Roof Mount - #121112',,,'0'],['45 kW Roof Mount - #97458',,,'0'],['55 kW Roof Mount - #97459',,,'0'],['850 kW Solar Carport - #130217',,,'0'],['100 kW Ground Mount - #86954',,,'0'],['123 kW Ground Mount - #129823',,,'0'],['82 kW Roof Mount - #127716',,,'0'],['178 kW Roof Mount -  #135387',,,'0'],['55 kW Roof Mount - #129821',,,'0'],['5 MW Ground Mount - #138323',,,'0'],['30 kW Roof Mount - #144723',,,'0'],['20 kW Roof Mount - #148539',,,'0'],['92 kW Roof Mount - #148041',,,'0'],['195 kW Roof Mount - #148043',,,'0'],['167 kW Roof Mount - #148044',,,'0'],['146 kW Roof Mount - #148046',,,'0'],['90 kW Roof Mount - #148045',,,'0'],['63 kW Roof Mount - #148038',,,'0'],['400 kW Roof Mount - #148042',,,'0'],['436 kW Roof Mount - #148040',,,'0'],['80 kW Roof Mount - #148039',,,'0'],['130 kW Roof Mount - #148037',,,'0'],['53 kW Roof Mount - #148036',,,'0'],['130 kW Roof Mount - #147231',,,'0'],['34 kW Roof Mount - #133917',,,'0'],['108 kW Roof & Ground Mount - #128914',,,'0'],['30 kW Roof Mount - #127714',,,'0'],['42 kW Roof Mount - #136885',,,'0'],['124 kW Roof Mount - #135297',,,'0'],['1.158 MW Roof Mount & Carport - #136298',,,'0'],['448 kW Roof Mount - #131716',,,'0'],['124 kW Roof Mount - #74673',,,'0'],['100 kW Roof Mount - #135296',,,'0'],['30 kW Ground Mount - #137526',,,'0'],['500 kW Ground Mount - #136291',,,'0'],['1 MW Ground Mount - #136290',,,'0'],['20 kW Roof Mount - #147230',,,'0'],['50 kW Roof Mount - #146830',,,'0'],['110 kW Roof Mount - #145224',,,'0'],['70 kW Roof Mount - #145825',,,'0'],['700 kW Solar Carport - #135288',,,'0'],['16 kW Ground Mount - #121124',,,'0'],['110 kW Community Solar Garden - #73487',,,'0'],['540 kW Roof Mount - #134386',,,'0'],['16 kW Roof Mount - #89654',,,'0'],['30 kW Roof Mount - #144927',,,'0'],['18 kW Roof Mount - #143027',,,'0'],['228 kW Roof Mount - #142827',,,'0'],['14 kW Roof Mount - #143026',,,'0'],['30 kW Roof Mount - #144523',,,'0'],['60 kW Roof Mount - #142826',,,'0'],['209 kW Roof Mount - #137330',,,'0'],['104 kW Roof Mount - #137331',,,'0'],['50 kW Roof Mount- #113729',,,'0'],['25 kW Roof Mount - #135287',,,'0'],['538 kW Roof Mount - #142825',,,'0'],['30 kW Roof Mount - #142923',,,'0'],['50 kW Roof Mount - #142723',,,'0'],['38 kW Roof Mount - #142426',,,'0'],['25 kW Roof Mount - #123913',,,'0'],['60 kW Roof Mount - #136299',,,'0'],['1 MW Ground Mount - #142032',,,'0'],['550 kW Roof Mount & Carport - #135289',,,'0'],['132 kW Roof Mount - #136788',,,'0'],['50 kW Ground Mount - #139123',,,'0'],['26 kW Solar Carport - #136385',,,'0'],['20 kW Roof Mount - #141425',,,'0'],['214 kW Roof Mount - #141327',,,'0'],['800 kW Ground Mount - #141330',,,'0'],['317 kW Roof Mount - #141223',,,'0'],['1 MW Roof Mount - #139428',,,'0'],['96 kW Roof Mount - #139427',,,'0'],['15 kW Roof Mount - #139330',,,'0'],['85 kW Roof Mount - #136985',,,'0'],['33 kW Roof Mount - #139923',,,'0'],['50kW Commercial Solar Project - Madison, AL - Opportunity 75276',,,'0'],['30kW Solar Roof Mount - Commercial Project-Opportunity 73033',,,'0'],['281kW School Solar Project - Huntsville, AL - Opportunity 74674',,,'0'],['90kW Commercial Solar Project - Madison, AL - Opportunity 75277',,,'0'],['253kW Ground Mount - Commercial Project - Opportunity 73486',,,'0'],['294kW Solar Roof Mount - Behind the Meter - Commercial Project-Opportunity 73467',,,'0'],['1MW Solar Ballast Commercial Solar Project - McCalla, AL - Opportunity 75280',,,'0'],['500kW Commercial Behind the Meter Project - Chattanooga, TN - Opportunity 69290',,,'0'],['144kW Solar Ballast - Commercial Project-Opportunity 73482',,,'0'],['661kW Municipal Solar Project - Selinsgrove, PA - Opportunity 74571',,,'0'],['50kW Commercial Project-Opportunity 63830',,,'0'],['150kW Roof Mount Industrial Solar Project - Opportunity #89460',,,'0'],['20kW Roof Mount Solar Project - Pocono Lake, PA - Opportunity 114430',,,'0'],['53kW Flush Roof Mount Solar Project - Moncks Corner, SC - Opportunity 113028',,,'0'],['20kW Flush Roof Mount Solar Project - South Roxana, IL - Opportunity 111431',,,'0'],['10kW Ballasted Roof Mount Solar Project - Billerica, MA - Opportunity 112128',,,'0'],['100kW Ballasted Roof Mount Solar Project - Pelham, NH - Opportunity 112228',,,'0'],['17kW Church Rooftop Solar Project - Opportunity #96064',,,'0'],['168kW Ballast Roof Mount Solar Project - Opportunity #105835',,,'0'],['356kW Ballast Roof Mount Solar Project - Opportunity #101461',,,'0'],['503kW Ballast Roof Mount Solar Project - Opportunity #101460',,,'0'],['120kW Ballast Roof Mount Solar Project - Opportunity #102528',,,'0'],['100kW Ground Mount Solar Project - Opportunity #94965',,,'0'],['30kW Commercial Ballast Solar Project - Opportunity #103428',,,'0'],['41kW Farm Workshop Rooftop Solar Project - Opportunity #98860',,,'0'],['50kW Commercial Storage Facility Project - Opportunity 71711',,,'0'],['20kW Commercial Agriculture - Opportunity 45939',,,'0'],['200kW Solar Ballast - Commercial Project-Opportunity 73046',,,'0'],['200kW Solar Ballast - Commercial Project-Opportunity 72486',,,'0'],['1.78MW Rooftop & Ground Mount Solar Project - Opportunity #99458',,,'0'],['25kW Roof Mount Office Building Solar Project - Opportunity #94967',,,'0'],['40kW Roof Mount Apartment Building Solar Project - Opportunity #80348',,,'0'],['42kW Roof Mount Commercial Solar Project - Opportunity #79149',,,'0'],['70kW Roof Mount Industrial Solar Project - Opportunity #89458',,,'0'],['117kW Senior Apartment Building Solar Project - Opportunity #78746',,,'0'],['1.2 MW Roof Mount Solar Project - Mableton, GA - Opportunity 130314',,,'0'],['30kW Roof Mount Solar Project - Washington, D.C. - Opportunity 127715',,,'0'],['32kW Roof Mount Solar Project - Jefferson, TX - Opportunity 127719',,,'0'],['40kW Roof Mount Solar Project - Haledon, NJ - Opportunity 128714',,,'0'],['215kW Roof Mount Solar Project - Mt. Pleasant, SC - Opportunity 128719',,,'0'],['20kW Roof Mount Solar Project - Homosassa, FL - Opportunity 121110',,,'0'],['230kW Roof Mount Solar Project - Livingston, MT - Opportunity 118692',,,'0'],['16kW Roof Mount Solar Project - Homosassa, FL - Opportunity 118701',,,'0'],['42kW Roof Mount Solar Project - Homosassa, FL - Opportunity 118702',,,'0'],['15kW Roof Mount Solar Project - Warrington, PA - Opportunity 118693',,,'0'],['200kW Roof Mount Solar Project - Wilmington, MA - Opportunity 117928',,,'0'],['786kW Roof Mount with Car Port Solar Project - Hooksett, NH - Opportunity 118029',,,'0'],['126kW Roof Mount Solar Project - Sherman, TX - Opportunity 114435',,,'0'],['43kW Roof Mount Commercial Solar Project - Opportunity #88167',,,'0'],['9kW Roof Mount (Flush) Solar Project - South Roxanna, IL - Opportunity 114033',,,'0'],['15kW Roof Mount (Flush) Solar Project - East Alton, IL - Opportunity 114032',,,'0'],['87kW Roof Mount (Ballast) Solar Project - East Orange, NJ - Opportunity 114030   ',,,'0'],['329kW Car Port Solar Project - Norwood, NJ - Opportunity 114029',,,'0'],['57kW Roof Mount (Flush) Solar Project - Leesburg, GA - Opportunity 114128',,,'0'],['50kW Flush Roof Mount Solar Project - Decatur, AL - Opportunity 60707',,,'0'],['373kW Ballast Roof Mount Solar Project - West Orange, NJ - Opportunity 114434',,,'0'],['26kW Ballast Roof Mount Solar Project - Brooklyn, NY - Opportunity 112832',,,'0'],['42kW Flush Roof Mount Solar Project - Warminster, PA - Opportunity 107429',,,'0'],['46kW Ballast Roof Mount Solar Project - Houston, TX - Opportunity 113428',,,'0'],['23kW Ballast Roof Mount Solar Project - El Paso, TX - Opportunity 112831',,,'0'],['1 MW Ground Mount Solar Project - Huntsville, AL - Opportunity 132016',,,'0'],['24kW Roof Mount - Commercial Project - Opportunity 73688',,,'0'],['35kW Commercial Solar Project - Opportunity #78847',,,'0'],['60kW Church Solar Project - Cincinnati, OH - Opportunity 74774',,,'0'],['148kW Roof Mount Solar Project - Cockeysville, MD - Opportunity 118700',,,'0'],['130kW Roof Mount Solar Project - San Antonio, TX - Opportunity 123417',,,'0'],['75kW Roof Mount Solar Project - Providence, RI - Opportunity 116628',,,'0'],['1MW Ground Mount Solar Project - El Paso, TX - Opportunity 120210',,,'0'],['14kW Roof Mount Solar Project - Metairie, LA - Opportunity 121121',,,'0'],['32kW Solar Carport Project - Jim Thorpe, PA - Opportunity 129820',,,'0'],['75kW Roof Mount Solar Project - Denton, TX - Opportunity 115329',,,'0'],['100kW Solar Ballast - Commercial Project-Opportunity 49915',,,'0'],['60kW Roof Mount Solar Project - Homosassa, FL - Opportunity 121111',,,'0'],['28kW Commercial Rooftop Solar Project - Opportunity #87055',,,'0'],['10kW Commercial Rooftop Solar Project - Opportunity #106728',,,'0'],['75kW School/Church Flush Mount Rooftop Solar Project - Opportunity #108331',,,'0'],['75kW Ballast Roof Mount Commercial Project - Opportunity #106827',,,'0'],['28kW Roof Mount Commercial Project - Opportunity #105839',,,'0'],['68kW Roof Mount Solar Project - Blue Ridge, GA - Opportunity 116429',,,'0'],['606kW Ballsted Roof Mount Solar Project - Houston, TX - Opportunity 112230',,,'0'],['315kW Roof Mount Solar Project - Dover, NH - Opportunity 118030',,,'0'],['55kW Commercial Rooftop Solar Project - Opportunity #108330',,,'0'],['1.2MW Roof Mount Solar Project - Elk Grove Village, IL - Opportunity 116428',,,'0'],['740kW Roof Mount Solar Project - El Paso, TX - Opportunity 115531',,,'0'],['50kW Ground Mount Solar Project - Huntsville, AL - Opportunity 118031',,,'0'],['150kW Roof Mount & Solar Carport Project - Pahrump, NV - Opportunity 113730',,,'0'],['78kW Roof Mount Solar Project - Lincoln, RI - Opportunity 107427',,,'0'],['20kW Ground Mount Solar Project - Albrightsville, PA - Opportunity 114429',,,'0'],['66kW Solar Ballast - Commercial Project-Opportunity 73471',,,'0'],['193kW Solar Ballast Roof Mount - Commercial Project - Opportunity 73484',,,'0'],['200kW Roof Mount Solar Project - Kirksville, MO - Opportunity 128516',,,'0'],['30kW Roof Mount Solar Project - Laredo, TX - Opportunity 127016',,,'0'],['768kW Roof Mount Solar Project - Glendale Heights, IL - Opportunity 126218',,,'0'],['1.25 MW Ground Mount Solar Project - Roanoke, AL - Opportunity 125913',,,'0'],['350kW Roof Mount Solar Project - Brooklyn, NY - Opportunity 124611',,,'0'],['160kW Roof Mount Solar Project - Tewksbury, MA - Opportunity 125325',,,'0'],['110kW Roof Mount Solar Project - Florence, AL - Opportunity 126215',,,'0'],['100kW Roof Mount Solar Project - Florence, AL - Opportunity 126216',,,'0'],['Simar',42.3919956,-71.1245458, 'user']];
                var infoWindowContent;
                infoWindowContent=this.windowContent;
                //console.log(infoWindowContent);
                var map;
                var bounds = new google.maps.LatLngBounds();
                var center = new google.maps.LatLng(42.3919956,-71.1245458);
                var mapOptions = {
                    //mapTypeId: 'roadmap',
                    mapTypeId : google.maps.MapTypeId.ROADMAP,
                    zoom: 7,
                    center: center,
                    mapTypeControl: false,
                    maxZoom : 10
                };
                // Display a map on the page
                map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
                map.setTilt(45);
                // Display multiple markers on a map
                var infoWindow = new google.maps.InfoWindow(), marker, i;
                var icon_url = "http://maps.google.com/mapfiles/ms/micons/";
                var marker, i;
                //var markers = new Array();
                // Loop through our array of markers & place each one on the map  
                for( i = 0; i < markers.length; i++ ) { 
                    var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
                    bounds.extend(position);
                    // console.log(this.markers[i][3]);
                    var icon ;
                    //console.log(markers[i][3]);
                    switch (markers[i][3]) {
                        case "0":
                            icon = "lightblue"; //array('0' => 'In Discussion', '1' => 'Working Model Presented', '2' => 'Letter of Intent', '3' => 'Qualified') ;
                            break;
                        case "1":
                            icon = "orange";
                            break;
                        case "2":
                            icon = "green";
                            break;
                        case "3":
                            icon = "purple";
                            break;
                        case "user":
                            icon = "sunny";
                            //icon_url = "http://maps.google.com/mapfiles/ms/micons/" ;
                            break;
                    }
                    //icon = "sunny";
                    icon = icon_url + icon + ".png";
                    //alert(icon);
                    var marker;
                    marker = new google.maps.Marker({
                        position: position,
                        map: map,
                        title: markers[i][0],
                        icon: icon
                    });
                    //alert(infoWindowContent[i][0]);
                    // Allow each marker to have an info window    
                    google.maps.event.addListener(marker, 'click', (function(marker, i) {
                        return function() {
                            infoWindow.setContent(infoWindowContent[i][0]);
                            infoWindow.open(map, marker);
                        }
                    })(marker, i));
                }
                // Add the circle for this city to the map.
                var cityCircle = new google.maps.Circle({
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.5,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.2,
                    map: map,
                    center: center, 
                    radius: 160934 //80467.2
                });
                var legend = document.getElementById('legend1');
                var icons = {
                    '2': {
                        name: 'In Discussion',
                        icon: icon_url + 'lightblue.png',
                        title: 'In Discussion: The trusted sales agent/originator has been meeting with the client to determine their energy needs, budget and to gather 12 months utility bills.'
                    },
                    '1': {
                        name: 'Working Model Presented',
                        icon: icon_url + 'orange.png',
                        title: 'Working Model Presented: The trusted sales agent/originator has been meeting with the client to review the initial, preliminary drawings and estimate.'
                    },
                    '0': {
                        name: 'Letter of Intent',
                        icon: icon_url + 'green.png',
                        title: 'Letter of Intent: The customer has acknowledged to their trusted sales agent/originator they would like to move forward with installing solar. This is the highest qualified lead you can access.'
                    },
                    '3': {
                        name: 'Qualified',
                        icon: icon_url + 'purple.png',
                        title: 'Qualified: The trusted sales agent/originator has determined the property to be a good fit for solar, and are working to contact the decision makers about further interest.'
                    },
                    'user': {
                        name: 'Your location',
                        icon: icon_url + 'sunny.png',
                        title: ''
                    }
                };
                //alert(icon);
                for (var key in icons) {
                    var type = icons[key];
                    var name = type.name;
                    var icon = type.icon;
                    var title = type.title;
                    var div = document.createElement('div');
                    div.innerHTML = '<img src="' + icon + '" title="'+ title +'"> ' + name;
                    legend.appendChild(div);
                } 
                map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);

                document.getElementById('legend1').style.display = 'inline';
                
                /********************* MAP END **************************/
            } else {
              //alert("Not added");
            }
        });
    }

    trackProject(e,project_id:any) { 
       if(e.target.checked){
            this.checked=true;
        }else{
            this.checked=false
        }
        $('#mydiv').show();
        this.solarService.trackProject(<Solar>project_id,this.checked).subscribe(result => { 
            if(result.success=='true'){ 
                this.toasterService.pop('success', 'Project Successfully '+result.type, '');
            }
            if(result.success=='false'){
                 this.toasterService.pop('success', 'Project can not be Tracked', '');    
            }
            $('#mydiv').hide();   
        });
    
    }

   sumValue() {
    alert(this.sum);
        return 2000;
    }
    
}
	

