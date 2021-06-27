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
use Symfony\Component\HttpFoundation\Request;

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

    /**
     * @Route("/delete-sale", name="delete_sale", methods={"POST"})
     */
    public function delete_sale(Request $request): Response
    {
        $em = $this->getDoctrine()->getManager();
        $sale = $em->getReference(Sale::class, $request->get("id"));
        $em->remove($sale);
        $em->flush();
        $result = array("result"=> "Sale deleted");
        return new JsonResponse(json_encode($result), Response::HTTP_OK, [], true);
    }


    /**
     * @Route("/add-sale", methods={"POST"})
     */
    public function addSale(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $lastSale = $em->getRepository(Sale::class)->findBy(array(),array('id'=>'DESC'),1,0);
        $sale = new Sale();
        $sale->setRegion($request->get("region"));
        $sale->setCountry($request->get("country"));
        $sale->setItemType($request->get("item_type"));
        $sale->setSalesChannel($request->get("sales_channel"));
        $sale->setOrderPriority($request->get("order_priority"));
        $sale->setOrderId($request->get("order_id"));
        $sale->setShipDate($request->get("ship_date"));
        $sale->setUnitsSold($request->get("units_sold"));
        $sale->setUnitPrice($request->get("unit_price"));
        $sale->setUnitCost($request->get("unit_cost"));
        $sale->setTotalRevenue($request->get("total_revenue"));
        $sale->setTotalCost($request->get("total_cost"));
        $sale->setTotalProfit($request->get("total_profit"));
        $sale->setOrderDate($request->get("order_date"));
//        $sale->setId($lastSale[0]->getId() + 99999999999);
        $em->persist($sale);
        $em->flush();
        $result = array("result"=> "it's done");
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
