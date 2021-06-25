<?php

namespace App\Entity;

use App\Repository\SaleRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=SaleRepository::class)
 */
class Sale
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $region;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $country;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $itemType;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $salesChannel;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $orderPriority;

    /**
     * @ORM\Column(type="integer")
     */
    private $order_id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $shipDate;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $unitsSold;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $unitPrice;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $unitCost;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $totalRevenue;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $totalCost;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $totalProfit;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $orderDate;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRegion(): ?string
    {
        return $this->region;
    }

    public function setRegion(string $region): self
    {
        $this->region = $region;

        return $this;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(string $country): self
    {
        $this->country = $country;

        return $this;
    }

    public function getItemType(): ?string
    {
        return $this->itemType;
    }

    public function setItemType(?string $itemType): self
    {
        $this->itemType = $itemType;

        return $this;
    }

    public function getSalesChannel(): ?string
    {
        return $this->salesChannel;
    }

    public function setSalesChannel(?string $salesChannel): self
    {
        $this->salesChannel = $salesChannel;

        return $this;
    }

    public function getOrderPriority(): ?string
    {
        return $this->orderPriority;
    }

    public function setOrderPriority(?string $orderPriority): self
    {
        $this->orderPriority = $orderPriority;

        return $this;
    }

    public function getOrderId(): ?int
    {
        return $this->order_id;
    }

    public function setOrderId(int $order_id): self
    {
        $this->order_id = $order_id;

        return $this;
    }

    public function getShipDate(): ?string
    {
        return $this->shipDate;
    }

    public function setShipDate(?string $shipDate): self
    {
        $this->shipDate = $shipDate;

        return $this;
    }

    public function getUnitsSold(): ?string
    {
        return $this->unitsSold;
    }

    public function setUnitsSold(?string $unitsSold): self
    {
        $this->unitsSold = $unitsSold;

        return $this;
    }

    public function getUnitPrice(): ?float
    {
        return $this->unitPrice;
    }

    public function setUnitPrice(?float $unitPrice): self
    {
        $this->unitPrice = $unitPrice;

        return $this;
    }

    public function getUnitCost(): ?float
    {
        return $this->unitCost;
    }

    public function setUnitCost(?float $unitCost): self
    {
        $this->unitCost = $unitCost;

        return $this;
    }

    public function getTotalRevenue(): ?float
    {
        return $this->totalRevenue;
    }

    public function setTotalRevenue(?float $totalRevenue): self
    {
        $this->totalRevenue = $totalRevenue;

        return $this;
    }

    public function getTotalCost(): ?float
    {
        return $this->totalCost;
    }

    public function setTotalCost(?float $totalCost): self
    {
        $this->totalCost = $totalCost;

        return $this;
    }

    public function getTotalProfit(): ?float
    {
        return $this->totalProfit;
    }

    public function setTotalProfit(?float $totalProfit): self
    {
        $this->totalProfit = $totalProfit;

        return $this;
    }

    public function getOrderDate(): ?string
    {
        return $this->orderDate;
    }

    public function setOrderDate(?string $orderDate): self
    {
        $this->orderDate = $orderDate;

        return $this;
    }
}
