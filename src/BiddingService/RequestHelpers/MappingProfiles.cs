using AutoMapper;
using Contracts;

namespace BiddingService;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        //Create a mapping from our bid to our biddto
        CreateMap<Bid, BidDto>();
        CreateMap<Bid, BidPlaced>();
    }
}
