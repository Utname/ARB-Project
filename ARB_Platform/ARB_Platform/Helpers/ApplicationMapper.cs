using ARB_Platform.Data;
using ARB_Platform.Model;
using AutoMapper;

namespace ARB_Platform.Helpers
{
    public class ApplicationMapper : Profile
    {
        public ApplicationMapper() {
            CreateMap<Book, BookModel>().ReverseMap();
        }
    }
}
