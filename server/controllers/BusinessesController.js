const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports.createSavedBusiness = async (req, res) => {
    const { businessId } = req.body;
    const userEmail = res.locals.userEmail;

    // Check if the saved Yelp business already exists
    var savedBusiness = await prisma.savedBusiness.findUnique({
        where: {
            business_id: businessId
        }
    });

    // If the business doesn't exist, create a new saved Yelp business
    if (!savedBusiness) {
        savedBusiness = await prisma.savedBusiness.create({
            data: {
                business_id: businessId
            }
        });
    }

    // Find the user by email and connect the saved business
    const foundUser = await prisma.user.findUnique({
        where: {
            email: userEmail
        }
    });

    if (foundUser) {
        await prisma.user.update({
            where: {
                id: foundUser.id
            },
            data: {
                saved_businesses: {
                    connect: {
                        id: savedBusiness.id
                    }
                }
            }
        });
    } else {
        console.error("User not found");
    }

    res.send("Success in saving business");
}

module.exports.getSavedBusinesses = async (req, res) => {
    const userEmail = res.locals.userEmail;

    const savedBusinesses = await prisma.user.findUnique({
        where: {
            email: userEmail
        },
        select: {
            saved_businesses: {
                select: {
                    business_id: true
                }
            }
        }
    });

    const businessIds = savedBusinesses.saved_businesses.map(savedBusiness => savedBusiness.business_id);
    res.send(businessIds)
}

module.exports.deleteSavedBusiness = async (req, res) => {
    const { businessId } = req.body;
    const userEmail = res.locals.userEmail;

    // Find the user by email
    const foundUser = await prisma.user.findUnique({
        where: {
            email: userEmail
        },
        include: {
            saved_businesses: true // Include the saved businesses for this user
        }
    });

    if (foundUser) {
        // Find the saved Yelp business by its ID
        const savedBusinessIndex = foundUser.saved_businesses.findIndex(business => business.business_id === businessId);

        if (savedBusinessIndex !== -1) {
            // Remove the association between the user and the saved business
            await prisma.user.update({
                where: {
                    id: foundUser.id
                },
                data: {
                    saved_businesses: {
                        disconnect: {
                            id: foundUser.saved_businesses[savedBusinessIndex].id
                        }
                    }
                }
            });
        } else {
            console.error("Business not found in user's saved businesses");
        }
    } else {
        console.error("User not found");
    }


    res.send("unsaving");
}