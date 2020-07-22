<?php

namespace App\DataFixtures;

use App\Entity\Product;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class ProductsFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        // Déclaration du tableau de catégorie
        $categories = [
            'Entree',
            'Plat', 
            'Dessert', 
            'Boisson'
        ];

        $products = [
            'Soupe Miso',
            'Salade d\'algue',
            '4 nems au poulet légumes',
            'Salades de crevettes',
            'Sushi Avocat',
            'Sushi Saumon',
            'Sushi Thon',
            'Maki Tempura Crevette',
            'Maki Poulet Avocat',
            'Brochettes Boeuf Fromage',
            'Brochettes Poulet',
            'Soda',
            'Jus d\'orange',
            'Jus de pomme',
            'Gateau au chocolat',
            'Tarte aux pommes',
            'Sashimi saumon',
            'Sashimi thon',
            'Thé Japonais'
        ];

            for ($i = 0; $i < 25; $i++)
            { 
                $product = new Product();
                $product->setName($products[mt_rand(0, 18)]);
                $product->setDescription('Ce sont des données de test');
                $product->setImage('https://cdn.pixabay.com/photo/2016/03/05/22/23/asian-1239271_960_720.jpg');
                $product->setPrice(mt_rand(1, 20));
                $product->setCategory($categories[mt_rand(0,3)]);
                $product->setStatus(1);
                $manager->persist($product);
            }
        $manager->flush();        
    }
}
