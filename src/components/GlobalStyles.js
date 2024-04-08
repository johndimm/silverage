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
	float: right;
	cursor: pointer;
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
.page_title {
	font-size:18pt;
	clear: both;
	text-align: center;
	font-weight: 500;
	margin-top: 20px;
	margin-bottom: 5px;
}

.page_subtitle {
	font-size: 9pt;
	font-style: italic;
	text-align: center;
	margin-bottom: 10px;
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
`}</style>	
</div>
}            

export default GlobalStyles