
// console.log("Hello content script!!");

let count = 0;
let insertedNodes = [];
let nodesHidden = false;
$('div.fbUserPost').each(function(i){
count++;
insertedNodes.push(this);
// $(this).css('background-color','#EE178C');
});

console.log("number of initial fb posts" + count);

// Add button code
$('body').append('<button class = "lwbuttondiv ">Test</button>');
$('.lwbuttondiv').text('Hide Posts');
$('.lwbuttondiv').click(function() {
    if(nodesHidden) {
        for(let j = 0; j < insertedNodes.length; j++) {
            $(insertedNodes[j]).parent().show(500);
            $('.lwbuttondiv').text('Hide Posts');
            nodesHidden = false;
        }
    } else {
        for(let j = 0; j < insertedNodes.length; j++) {
            $(insertedNodes[j]).parent().hide(500);
            $('.lwbuttondiv').text('Show Posts');
            nodesHidden = true;
        }
    }
});
// Add button code


// creating mutation observers for facebook
let observer = new MutationObserver(function(mutations) {
 mutations.forEach(function(mutation) {
     //console.log('mutated!');
   for (let i = 0; i < mutation.addedNodes.length; i++)
    
    // Find the element nodes(===1)
    if(mutation.addedNodes[i].nodeType === 1){
        let innernodesaarray = mutation.addedNodes[i].getElementsByClassName('fbUserPost');
        if( innernodesaarray && innernodesaarray.length>0) {
            console.log('found post element node');
            for(let j = 0; j < innernodesaarray.length; j++){
                insertedNodes.push(innernodesaarray[j]);
                if(nodesHidden)
                    $(innernodesaarray[j]).parent().hide();
            }
        }
    }
     
 })
});
//var target = document.getElementById('contentArea');
//var target = $("[role='feed']").get(0);

let config = { /*attributes: true,*/ childList: true, characterData: true, subtree: true };

observer.observe(document, config);
//console.log(insertedNodes);