<?php

// /src/AppBundle/Event/Listener/JWTCreatedListener.php

namespace App\EventListener;

use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JWTCreatedListener
{
    /**
     * Replaces the data in the generated
     *
     * @param JWTCreatedEvent $event
     *
     * @return void
     */
    public function onJWTCreated(JWTCreatedEvent $event)
    {
        /** @var $user \App\Entity\User */
        $user = $event->getUser();

        // add new data
        $payload['Role'] = $user->getRoles();
        $payload['userId'] = $user->getId();
        $payload['username'] = $user->getUsername();
        $payload['lastname'] = $user->getLastName();
        $payload['firstname'] = $user->getFirstName();


        $event->setData($payload);
    }
}