using ARB_Platform.Data;
using ARB_Platform.Model;

namespace ARB_Platform.Repositories
{
    public interface IBookRepository
    {
        public Task<List<BookModel>> getAllBooksAsync();
        public Task<BookModel> getBooksAsync(int id);
        public Task<int> AddBookAsync(BookModel model);
        public Task UpdateBookAsync(int id,BookModel model);
        public Task DeleteBookAsync(int id);
    }
}
