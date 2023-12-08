using AutoMapper;
using Contracts;
using SearchService.Models;

namespace SearchService;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        //create a map to map from our AuctionCreated shape into an Item for Mongodb
        CreateMap<AuctionCreated, Item>();

        CreateMap<AuctionUpdated, Item>();

        //We dont need a mapping profile for AuctionDeleted as we are not using a _mapper in the consumer
    }
}
