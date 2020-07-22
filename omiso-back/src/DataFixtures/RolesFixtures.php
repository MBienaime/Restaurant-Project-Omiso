<?php

namespace App\DataFixtures;

use App\Entity\Role;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class RolesFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $roles = [
            'CLIENT',
            'EMPLOYEE', 
            'ADMIN'
        ];

            foreach ($roles as $role)
            { 
                $newRole = new Role();
                $newRole->setName($role);
                $newRole->setRoleString('ROLE_'.$role);

                $manager->persist($newRole);
            }
        $manager->flush();        
    }
}
