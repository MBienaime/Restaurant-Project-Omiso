<?php

namespace App\Controller\API;

use App\Entity\Product;
use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class ProductController extends AbstractController
{
    /**
     * @Route("/omiso/products", name="product")
     */
    public function browseProducts(ProductRepository $productRepository, SerializerInterface $serializer)
    {
        // Get all products
        $product = $productRepository->findAll([]);

        // noramlize before send it
        $data = $serializer->normalize($product, null, ['groups' => 'product']);

        return $this->json($data , 200,[], ["groups" => ["product"]]);
    }
}
