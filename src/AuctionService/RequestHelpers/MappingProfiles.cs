using AuctionService.DTOs;
using AuctionService.Entities;
using AutoMapper;
using Contracts;

namespace AuctionService.RequestHelpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        //Mapping for Entity to DTO
        CreateMap<Auction, AuctionDto>().IncludeMembers(x => x.Item);
        CreateMap<Item, AuctionDto>();

        //Mapping for DTO to Entity
        CreateMap<CreateAuctionDto, Auction>()
            .ForMember(d => d.Item, o => o.MapFrom(s => s));
        CreateMap<CreateAuctionDto, Item>();

        //- -- for service bus create contract - DTO to Contract
        CreateMap<AuctionDto, AuctionCreated>();

        //--- for service bus update - Entity to Contract
        // because we have a mapping in the update method in the controller: Auction Entity to Auction Updated:
        // await _publishEndpoint.Publish(_mapper.Map<AuctionUpdated>(auction));
        // we need to add this mapping profile
        CreateMap<Auction, AuctionUpdated>().IncludeMembers(a => a.Item);
        CreateMap<Item, AuctionUpdated>();
    }
}
