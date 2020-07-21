<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ProductRepository")
 */
class Product
{
    /**
     * @Groups("product")
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups("product")
     * @ORM\Column(type="string", length=50)
     */
    private $name;

    /**
     * @Groups("product")
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $description;

    /**
     * @Groups("product")
     * @ORM\Column(type="string", length=255)
     */
    private $image;

    /**
     * @Groups("product")
     * @ORM\Column(type="float")
     */
    private $price;

    /**
     * @Groups("product")
     * @ORM\Column(type="string", length=20)
     */
    private $category;

    /**
     * @Groups("product")
     * @ORM\Column(type="boolean")
     */
    private $status;

    /**
     * @Groups("order_product")
     * @ORM\OneToMany(targetEntity="App\Entity\OrderProduct", mappedBy="product", orphanRemoval=true)
     */
    private $order_product;

    public function __construct()
    {
        $this->order_product = new ArrayCollection();
    }

    public function __toString()
    {
        return $this->name;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): self
    {
        $this->image = $image;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getCategory(): ?string
    {
        return $this->category;
    }

    public function setCategory(string $category): self
    {
        $this->category = $category;

        return $this;
    }

    public function getStatus(): ?bool
    {
        return $this->status;
    }

    public function setStatus(bool $status): self
    {
        $this->status = $status;

        return $this;
    }

    /**
     * @return Collection|OrderProduct[]
     */
    public function getOrderProduct(): Collection
    {
        return $this->order_product;
    }

    public function addOrderProduct(OrderProduct $orderProduct): self
    {
        if (!$this->order_product->contains($orderProduct)) {
            $this->order_product[] = $orderProduct;
            $orderProduct->setProduct($this);
        }

        return $this;
    }

    public function removeOrderProduct(OrderProduct $orderProduct): self
    {
        if ($this->order_product->contains($orderProduct)) {
            $this->order_product->removeElement($orderProduct);
            // set the owning side to null (unless already changed)
            if ($orderProduct->getProduct() === $this) {
                $orderProduct->setProduct(null);
            }
        }

        return $this;
    }
}
