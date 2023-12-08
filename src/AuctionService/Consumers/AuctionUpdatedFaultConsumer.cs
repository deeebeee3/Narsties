using AutoMapper;
using Contracts;
using MassTransit;

namespace AuctionService;

public class AuctionUpdatedFaultConsumer : IConsumer<Fault<AuctionUpdated>>
{
    private readonly IMapper _mapper;

    public AuctionUpdatedFaultConsumer(IMapper mapper)
    {
        _mapper = mapper;
    }

    public async Task Consume(ConsumeContext<Fault<AuctionUpdated>> context)
    {
        Console.WriteLine("--> Consuming faulty auction update");

        var exception = context.Message.Exceptions.First();

        if (exception.ExceptionType == "System.ArgumentException")
        {
            context.Message.Message.Model = "Foobar";

            await context.Publish(context.Message.Message);
        }
        else
        {
            Console.WriteLine("Not an argument exception - update error dashboard somewhere");
        }
    }
}
