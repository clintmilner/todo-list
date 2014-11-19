(function()
{
    // variables
    var addTaskBtn = document.getElementById( 'submit' ),
        deleteTaskBtn = document.getElementsByClassName( 'delete' );

    var tmpl = function ( title, content ) {
        var task,
            titleEsc = escapeRegExp( title ),
            contentEsc = escapeRegExp( content );

        return task = '<div class="task wrapper">' +
        '<h2>' + titleEsc + '</h2>' +
        '<p>' + contentEsc + '</p>' +
        '<a class="delete">Delete</a></div>';
    };

    // functions
    function buildEvent( el, ev, fx ) {
        // lt IE9
        if ( el.attachEvent ) { return el.attachEvent( 'on' + ev, fx ); }
        else { return el.addEventListener( ev, fx, false ); }
    }
    function escapeRegExp( str ) {
        // sanitize < and > to prevent JS injections
        return str.replace( /</g, '&lt;' ).replace( />/g, '&gt;' );
    }
    function addTask( e ) {
        if ( e !== undefined ) { e.preventDefault(); }
        var listCont = document.getElementById( 'listCont' ),
            title = document.getElementById( 'title' ),
            content = document.getElementById( 'content' ),
            input = document.getElementsByTagName( 'input' ),
            textarea = document.getElementById( 'content' );

        if( title.value !== '' )
        {
            // ideally we would save this to LocalStorage or the DB via AJAX

            listCont.insertAdjacentHTML( 'afterbegin', tmpl( title.value, content.value ) );
            buildEvent( deleteTaskBtn[0], 'click', deleteTask );
            input[0].value = '';
            textarea.value = '';
        }
    }
    function deleteTask( e ) {
        var thisTask = e.target.parentNode;
        thisTask.remove();

        // ...and we would remove it from LocalStorage or the DB here
    }


    // init
    buildEvent( addTaskBtn, 'click', addTask );
    for( var i = 0; i < deleteTaskBtn.length; i++ )
    {
        buildEvent( deleteTaskBtn[i], 'click', deleteTask );
    }
})();
