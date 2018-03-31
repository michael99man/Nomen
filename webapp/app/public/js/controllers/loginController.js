
function LoginController()
{

// automatically toggle focus between the email modal window and the login form //
	$('#get-credentials').on('shown.bs.modal', function(){ $('#email-tf').focus(); });
	$('#get-credentials').on('hidden.bs.modal', function(){ $('#user-tf').focus(); });
}