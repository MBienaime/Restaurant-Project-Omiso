<?php

namespace App\Controller\API;

use App\Entity\Order;
use App\Entity\OrderProduct;
use App\Repository\OrderRepository;
use App\Repository\ProductRepository;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    /**
     * @Route("/omiso/order", name="order_")
     */
class OrderController extends AbstractController
{

    /**
     * @Route("/receipt", name="browse", methods={"GET"})
     */
    public function browseOrder(SerializerInterface $serializer, OrderRepository $orderRepository)
    {
        // Get all orders
        $order = $orderRepository->findAll([]);

        // noramlize before send it
        $data = $serializer->normalize($order, null, ["groups" => ["order", "product", "user"]]);

        return $this->json($data, 200, [], ["groups" => ["order", "product", "user"]]);
    }

    /**
     * @Route("/{id}", name="read", methods={"GET"})
     */
    public function read(Order $order)
    {
        return $this->json($order, 200, [], ["groups" => ["order","product"]]);
    }

    /**
     * @Route("/receipt/edit/{id}", name="edit", methods={"PUT", "PATCH"})
     */
    public function editOrder(Request $request, Order $order, OrderRepository $orderRepository)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $orderId = $order->getId();
        if(isset($orderId)){
            $order = $orderRepository->find($order->getId());
            if($order->getStatus()) {
                $newOrder = $order->setStatus(0);

                $entityManager->persist($newOrder);
                $entityManager->flush();
                
                return $this->json('Archivé avec succès', 200);
            }
            else{
                $newOrder = $order->setStatus(1);

                $entityManager->persist($newOrder);
                $entityManager->flush();
                
                return $this->json('Desarchivé avec succès', 200);
            }

        }
        
        return $this->json('Try again', 400);
    }

    /**
     * @Route("/", name="add", methods={"POST"})
     */
    public function addOrder(UserRepository $userRepository,ProductRepository $productRepository, Request $request, SerializerInterface $serializer)
    {
        $entityManager = $this->getDoctrine()->getManager();

        // Order data
        $data = json_decode($request->getContent());
        // Retrieve client identity
        $client = $userRepository->find($data->userId);

        // Create an Order
        $orderEntity = new Order();

        // Here we insert client data that was just retrieved above (Foreign Key)
        $orderEntity->setClient($client);
        $orderEntity->setStatus(1);
        $orderEntity->setComments($data->comments);
        $orderEntity->setTotalPrice($data->total_price);
        
        $entityManager->persist($orderEntity);
        
        // We integrate data into OrderProduct Table
        foreach($data->order_products as $orderProduct) {
            $opEntity = new OrderProduct();
            
            // Retrieve Product data
            $product = $productRepository->find($orderProduct->id);
            
            // Here we insert the order that was just created above (Foreign Key)
            $opEntity->setOrder($orderEntity);
            // Here we insert product data that was just retrieved above (Foreign Key)
            $opEntity->setProduct($product);
            $opEntity->setQuantity($orderProduct->quantity);
            
            // We persist each data
            $entityManager->persist($opEntity);
        }
        
        // Save this order in DB
        $entityManager->flush();

        return $this->json($orderEntity, 200,[], ["groups" => ["order"]]
        );
    }

}
