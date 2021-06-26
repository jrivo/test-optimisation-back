<?php

namespace App\Controller;

use App\Entity\Sale;
use App\Repository\SaleRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class SalesController extends AbstractController
{
    /**
     * @Route("/sales", name="sales")
     */
    public function index(): Response
    {
        $em = $this->getDoctrine()->getManager();
        $sales = $em->getRepository(Sale::class)->findAll();
        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);
        $jsonContent = $serializer->serialize($sales, 'json');
        return new JsonResponse($jsonContent, Response::HTTP_OK, [], true);
    }

    /**
     * @Route("/sales-light", name="sales_light")
     */
    public function sales_light(): Response
    {
        $em = $this->getDoctrine()->getManager();
        $sales = $em->getRepository(Sale::class)->findBy(array(), null, 10);
        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);
        $jsonContent = $serializer->serialize($sales, 'json');
        return new JsonResponse($jsonContent, Response::HTTP_OK, [], true);
    }


    /**
     * @Route("/heavy-operation", name="heavy_operation")
     */
    public function heavy_operation(): Response
    {
        $this->heavy_loop(1100);
        $result = array("result"=> "Operation finished");
        return new JsonResponse(json_encode($result), Response::HTTP_OK, [], true);
    }

    public function heavy_loop(int $iterations) {
        for($i = 0; $i < $iterations; $i++){
            for($j = 0; $j < $iterations; $j++){
                for($k = 0; $k < $iterations; $k++){
                        $result = $i*$j*$k;

                }
            }
        }
    }
}
