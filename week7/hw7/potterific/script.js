
// Harry Potter characters data
let characters = [
    {name:"Albus Dumbledore", role:"staff", house:"Gryffindor",gender:"m",alignment:"good"},    
    {name:"Nymphadora Tonks", role:"", house:"Hufflepuff",gender:"f",alignment:"good"},    
    {name:"Ron Weasley", role:"student", house:"Gryffindor",gender:"m",alignment:"good"},    
    {name:"Ginny Weasley", role:"student", house:"Gryffindor",gender:"f",alignment:"good"},    
    {name:"Hermione Granger", role:"student", house:"Gryffindor",gender:"f",alignment:"good"},    
    {name:"Mad-eye Moody", role:"staff", house:"",gender:"m",alignment:"good"},    
    {name:"Prof McGonagall", role:"staff", house:"Gryffindor",gender:"f",alignment:"good"},    
    {name:"Harry Potter", role:"student", house:"Gryffindor",gender:"m",alignment:"good"},    
    {name:"Draco Malfoy", role:"student", house:"Slytherin",gender:"m",alignment:"evil"},    
    {name:"Hagrid", role:"staff", house:"Gryffindor",gender:"m",alignment:"good"},    
    {name:"Luna Lovegood", role:"student", house:"Ravenclaw",gender:"f",alignment:"good"},    
    {name:"Voldemort", role:"", house:"Slytherin",gender:"m",alignment:"evil"},    
    {name:"Bellatrix Lestrange", role:"", house:"Slytherin",gender:"f",alignment:"evil"},           
    {name:"Severus Snape", role:"staff", house:"Slytherin",gender:"m",alignment:"?"}
];

$(document).ready(function(){
    // This builds the entire character table from scratch
    function mytable() {
        // This starts fresh - and removes all rows but keep the header
        $("table tr:not(:first)").remove();
        
        // It loops through each character to create table rows
        $.each(characters, function(index, character) {
            // It makes a new row
            let row = $("<tr>");
            
            // It fills in all the character details
            row.append($("<td>").text(character.name));
            row.append($("<td>").text(character.role));
            row.append($("<td>").text(character.house));
            row.append($("<td>").text(character.gender));
            row.append($("<td>").text(character.alignment));
            
            // It adds the row to the table
            $("table").append(row);
        });
        
        // This makes the zebra stripes using even/odd rows
        $("table tr:not(:first):even").addClass("even");
        $("table tr:not(:first):odd").addClass("odd");
    }
    
    // It creates the table when the page loads
    mytable();
    
    // Get all the different houses with no duplicates
    const uniqueHouses = [...new Set(characters.filter(c => c.house).map(c => c.house))];
    
    // It makes a button for each house
    uniqueHouses.forEach(house => {
        $("<button>")
            .text(house)
            .click(() => filterByHouse(house))
            .appendTo("#buttons");
    });
    
    // This shows only characters from a specific house
    function filterByHouse(house) {
        // It hides everyone first
        $("table tr:not(:first)").hide();
        
        // It shows only the characters from the selected house
        $("table tr:not(:first):contains('" + house + "')").show();
        
        // It fixes the zebra stripes on the visible rows
        $("table tr:not(:first)").removeClass("even odd");
        $("table tr:not(:first):visible:even").addClass("even");
        $("table tr:not(:first):visible:odd").addClass("odd");
    }
    
    // This is the resets button that shows everyone again
    $("button:contains('reset')").click(function() {
        $("table tr:not(:first)").show();
        
        // This fixes the zebra stripes after showing everyone
        $("table tr:not(:first)").removeClass("even odd");
        $("table tr:not(:first):even").addClass("even");
        $("table tr:not(:first):odd").addClass("odd");
    });
});
