
var saveButton, forkButton, parentButton, diffButton;
var effect_owner=false;
var original_code='';
var original_version='';

function initialize_compressor(){
	return null;
}

function initialize_helper() {
	
}

function generate_user_id() {
	return (Math.random()*0x10000000|0).toString(16);
}

function get_user_id() {
	return localStorage.getItem('glslsandbox_user');
}

function am_i_owner() {
	return (effect_owner && effect_owner==get_user_id());
}

function load_url_code() {
	if ( window.location.hash!='') {

		load_code(window.location.hash.substr(1));

	} else {

		code.setValue(document.getElementById( 'example' ).text);
		original_code = document.getElementById( 'example' ).text;

	}
}

function add_server_buttons() {
}

function set_save_button(visibility) {
}

function set_parent_button(visibility) {
	
}


function get_img( width, height ) {
}

function save() {
}

function load_code(hash) {
	if (gl) {
		compileButton.title = '';
		compileButton.style.color = '#ffff00';
		compileButton.textContent = 'Loading...';
	}
	set_save_button('hidden');
	set_parent_button('hidden');

	$.getJSON('/item/'+hash, function(result) {
		compileOnChangeCode = false;  // Prevent compile timer start
		code.setValue(result['code']);
		original_code=code.getValue();

		if(result['parent']) {
			original_version=result['parent'];
			parentButton.href = original_version;
			diffButton.href = 'diff#' + original_version.substring(3) + '-vs-' + hash;
			set_parent_button('visible');
		} else {
			original_version='';
			parentButton.href = '/';
			diffButton.href = '/';
			set_parent_button('hidden');
		}

		effect_owner=result['user'];

		if(am_i_owner())
			saveButton.textContent = 'save';
		else
			saveButton.textContent = 'fork';

		resetSurface();
		compile();
		compileOnChangeCode = true;
	});
}

// dummy functions

function setURL(fragment) {
}

