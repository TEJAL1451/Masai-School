const library = {
    books: [{ title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 }],
  
    addBook(book) {
      if (!book.title || !book.author || !book.year) {
        console.log("Please provide complete book details.");
        return;
      }
      this.books.push(book);
      console.log(`Added: "${book.title}"`);
    },
  
    findBookByTitle(title) {
      return this.books.find(book => book.title.toLowerCase() === title.toLowerCase());
    },
  
    
    removeBook(title) {
      const index = this.books.findIndex(book => book.title.toLowerCase() === title.toLowerCase());
      if (index !== -1) {
        console.log(`Removed: "${this.books[index].title}"`);
        this.books.splice(index, 1);
      } else {
        console.log(`"${title}" not found.`);
      }
    }
  };
  
  library.addBook({ title: "1984", author: "George Orwell", year: 1949 }); 
  library.addBook({ author: "J.K. Rowling", year: 1997 }); 
  
  console.log(library.findBookByTitle("The Hobbit")); 
  
  library.removeBook("The Hobbit"); 
  library.removeBook("The Great Gatsby"); 
  
