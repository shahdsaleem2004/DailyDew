document.getElementById("quizForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Submit the form to the servlet
    this.submit();
});