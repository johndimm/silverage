import React from 'react'

const GlobalStyles = () => {
    return <div>
<style global="true" jsx="true">{`
:root {
	--factor: 1;
}

.fp_feature_filter, .fp_credits {
	font-weight: 300;
	font-size: 10pt;
	max-height: 1000px;
	overflow: auto;
    margin-right: 20px;
	float:left;
}

.fp_credits dl {
	font-size: 8pt;
}

.fp_feature_filter input {
	margin-right: 10px;
}

.fp_feature_filter input[type='text'] {
	width: 153px;
}

.fp_feature_filter span {
	white-space: nowrap;
	cursor: pointer;
}
			
.fp_filter_panel {
	width: 250px;
	float: left;
	padding: 10px;
	border: 1px solid gray;
	margin-bottom: 100px;
	height: 100%;
	overflow: auto;
}

.fp_buttons {
	width: 100%;
	clear: both;
	font-size:10pt;
	text-align: center;
}

.fp_forsaleonly {
	text-align: center;
	text-weight: 600;
	cursor: pointer;
	font-size: 14pt;
	color: red;
}

.fp_clear_button {

	cursor: pointer;
	margin-top: 20px;
}

.fp_home_button {
	float: left;
	cursor: pointer;
}

.fp_more_link {
	width: 100%;
	text-align: center;
	margin-top: 10px;
	cursor: pointer;
	font-style: italic;
	font-size: 10pt;
}

.fp_feature_count {
	font-size: 9pt;
	color: gray;
}

.fp_pointer {
	cursor: pointer;
}

.fp_debug {
	font-size: 10pt;
	border: 1px solid black;
	margin: 10px;
	padding: 3px;
}				

.fp_clear_search {
	border: 1px solid gray;
	cursor: pointer;
	padding: 2px;
	font-size: 10pt;
	margin-left: -5px;
}	

.picSize {
	cursor:pointer;
	margin:5px;
}

@font-face {
    font-family: fantastifont;
    src: url(Fantastifont-DOl1.ttf);
	letter-spacing: 5px;
}

@font-face {
    font-family: komika;
    src: url(KOMIKAHB.ttf);
}

.page_title {
	font-size:12pt;
	clear: both;
	text-align: center;
	font-weight: 700;
	font-family: sans-serif, fantastifont;
	letter-spacing: 11px;
	margin-bottom: 5px;
}

.page_subtitle {
	font-size: 10pt;

	text-align: center;
	margin-bottom: 15px;
	font-family: komika;
	padding: 5px;
	background-color: yellow;
	border: 2px solid darkblue;
	width: 220px;
	height: 50px;
}

.dummy {
	border-radius:10px;
}

.xtitles {


}

$clr-primary: #f7cfc8;
$clr-secondary: #4d84c8;
$clr-wht: #fffcf6;

.chunky_page_title {
	color: $clr-primary;
	font-family: "Luckiest Guy";
	font-size: 22px;
	letter-spacing: 2px;
	text-align: center;
	text-shadow: -6px -6px $clr-secondary, -5px -5px $clr-secondary,
	  -4px -4px $clr-secondary, -3px -3px $clr-secondary, -2px -2px $clr-secondary,
	  -1px -1px $clr-secondary, 1px 1px $clr-secondary, 2px 2px $clr-secondary,
	  3px 3px $clr-secondary, 4px 4px $clr-secondary, 5px 5px $clr-secondary,
	  6px 6px $clr-secondary, 7px 7px $clr-secondary, 8px 8px $clr-secondary,
	  9px 9px $clr-secondary, 10px 10px $clr-secondary, 11px 11px $clr-secondary,
	  12px 12px $clr-secondary, 13px 13px $clr-secondary, 14px 14px $clr-secondary,
	  15px 15px $clr-secondary, 16px 16px $clr-secondary, 17px 17px $clr-secondary,
	  18px 18px $clr-secondary, 19px 19px $clr-secondary, 20px 20px $clr-secondary,
	  21px 21px $clr-secondary, 22px 22px $clr-secondary, 23px 23px $clr-secondary,
	  24px 24px $clr-secondary, 25px 25px $clr-secondary, 26px 26px $clr-secondary,
	  27px 27px $clr-secondary, 25px 25px $clr-secondary, 28px 28px $clr-secondary,
	  29px 29px $clr-secondary, 30px 30px $clr-secondary, 31px 31px $clr-secondary,
	  32px 32px $clr-secondary, 33px 33px $clr-secondary, 34px 34px $clr-secondary,
	  35px 35px $clr-secondary, 36px 36px $clr-secondary, 37px 37px $clr-secondary,
	  38px 38px $clr-secondary, 39px 39px $clr-secondary, 40px 40px;
	width: 100%;
  }
  



dt {
	font-weight: 600;
}

textarea {
  width: 100%;
  height: 75px;
  padding: 10px;
  margin-top: 5px;
}
dd {
	margin-bottom:5px;
}


`}</style>	
</div>
}            

export default GlobalStyles