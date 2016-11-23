$(document).ready(function() {

    $("button").click(function(event) {

        event.preventDefault();

        //display div with the stats
        $(".text-report").removeClass("hidden");

        //Get the input from textbox and then split to an array
        var input = $("#user-text").val();
        var wordsList = input.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(" ");
        console.log(wordsList);

        updateElement(wordsList.length, ".js-total-ct");
        updateElement(getUnique(wordsList), ".js-unique-ct");
        updateElement(getAvgWrdLgth(wordsList), ".js-word-length");

        var sentenceList = input.split(".");
        updateElement(getAvgSentLgth(sentenceList), ".js-sentence-length");
    });

});



function getUnique(wordsList) {
    var wordsObj = {};

    //for every word in the list
    for (var i = 0; i < wordsList.length; i++) {
        var currentWord = wordsList[i].trim();

        var alreadyExists = false;
        //for every key in wordsObj
        for (var word in wordsObj) {

            if (currentWord == word) {
                alreadyExists = true;
                wordsObj[currentWord]++;
                break;
            }
        }
        if (!alreadyExists) {
            wordsObj[currentWord] = 1;
        }
    }

    var counter = 0;
    for (var word in wordsObj){
        if (wordsObj[word] == 1) {
            counter++;
        }
    };

    return counter;
};



function getAvgWrdLgth(wordsList) {

    var sum = 0;

    for (var i = 0; i < wordsList.length; i++) {
        sum += wordsList[i].length;
    }
    return sum / wordsList.length;
};



function getAvgSentLgth(sentenceList) {
    var sum = 0;
    var numSentences = 0;

    for (var i = 0; i < sentenceList.length; i++) {

        sentenceList[i] = sentenceList[i].trim();
        sum += sentenceList[i].length;

        if (sentenceList[i] != "") {
            numSentences++;
        }
    };

    return sum / numSentences;
}



function updateElement(num, classStr) {

    $(classStr).text(num.toString());
};
