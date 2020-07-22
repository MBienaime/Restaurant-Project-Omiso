<?php

namespace App\Controller\API;

use App\Entity\User;
use App\Repository\RoleRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;


/**
 * @Route("/omiso/user", name="user_")
 */
class UserController extends AbstractController
{

    /**
     * @Route("/sign_up", name="sign_up", methods={"POST"})
     */
    public function signUp(Request $request, UserPasswordEncoderInterface $encoder, RoleRepository $roleRepository, ValidatorInterface $validator)
    { 
        // Getting the entity manager
        $entityManager = $this->getDoctrine()->getManager();
        
        // Retrieve the data sent from the Register Form
        $data = json_decode($request->getContent());
        
        // Set a new user
        $user = new User;

        // Add data
        $user->setEmail($data->email);
        
        // If $data doesn't contain password then redirect with a bad request
        if(isset($data->password) && !empty($data->password)) {
            $user->setPassword(
                $encoder->encodePassword($user, $data->password)
            );
        }
        else {
            return new Response('Password must be set', Response::HTTP_BAD_REQUEST);
        }


        $user->setLastName($data->lastname);
        $user->setFirstName($data->firstname);
        $user->setPhoneNumber($data->phone_number);
        $user->setAddress($data->address);
        $user->setPostalCode($data->postal_code);
        $user->setCity($data->city);

        $role = $roleRepository->findOneBy(["name" => "CLIENT"]);
        $user->setRole($role);

        // Handling errors on the data
        $errors = $validator->validate($user);
        if (count($errors) > 0){
            $errorsString = (string) $errors;
            return new Response($errorsString, Response::HTTP_BAD_REQUEST);
        };
        
        // if there is no errors, we flush to the database
        $entityManager->persist($user);

        $entityManager->flush();


        // return HTTP status code to the browser
        return new Response('utilisateur crée', Response::HTTP_CREATED);
    
    }
    
}
