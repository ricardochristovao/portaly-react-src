//From depedencies
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

//From services
import InitPath from "../../../services/InitPath";

//From Material-ui
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from "@material-ui/lab";

//From checkout
import useStyles from "./style";

//From util
import colors from "../../../util/Colors";
import { Typography } from "@material-ui/core";

//From API
import ApiCupom from "../../../services/ApiCupom";

const MostrarProdutos = (props) => {
  const classes = useStyles();
  const {
    produtos,
    carrinho,
    removeProductCart,
    handleClick,
    handleChange,
    coupon,
    handleUpdateQuant,
    removeKit,
    updateQuantidadeKit,
  } = props;

  const handleRemoveProduct = (event) => {
    removeProductCart(event.currentTarget.id);
  };

  const handleQuantidade = (event) => {
    handleUpdateQuant(event.currentTarget.id, event.currentTarget.slot);
  };

  const getProdutosCarrinho = (carrinho) => {
    let produtosCarrinho = [];
    for (const produto in carrinho)
      if (
        produto !== "quantidadeTotal" &&
        produto !== "valorTotal" &&
        produto !== "kits"
      )
        produtosCarrinho.push(carrinho[produto]);

    return produtosCarrinho;
  };

  const getkits = (carrinho) => {
    return carrinho.kits ? Object.values(carrinho.kits) : [];
  };

  const produtosCarrinho = getProdutosCarrinho(carrinho);
  const kits = getkits(carrinho);

  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [severity, setSeverity] = React.useState("success");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const createMessage = async () => {
    setSeverity("info");
    setMsg("Estamos procurando seu cupom, aguarde...");
    setOpen(true);
    if (props.coupon === "") {
      setSeverity("warning");
      setMsg("Nenhum cupom informado");
    } else {
      const response = await ApiCupom.getCoupon(props.coupon);
      if (response.data.length > 0) {
        setSeverity("success");
        setMsg("Cupom válido! Veja seu benefício na tela final de pagamento");
      } else {
        setSeverity("error");
        setMsg("Cupom inválido!");
      }
    }
    setOpen(true);
  };

  return (
    <Grid>
      <Box border={2} borderColor={colors.orangeDark}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity}>
            {msg}
          </Alert>
        </Snackbar>
        <TableContainer className={classes.table}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell className={classes.textColor}>Produto</TableCell>
                <TableCell align="right" className={classes.textColor}>
                  Preço
                </TableCell>
                <TableCell align="center" className={classes.textColor}>
                  Quantidade
                </TableCell>
                <TableCell align="right" className={classes.textColor}>
                  Total
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <Fragment>
                {produtosCarrinho.map((produto) => {
                  return (
                    <TableRow key={`row${produto.produto[0].id}`}>
                      <TableCell align="left">
                        <CloseIcon
                          onClick={handleRemoveProduct}
                          id={produto.produto[0].id}
                          className={classes.icon}
                        />
                        <Link
                          to={`${InitPath}/produto/${produto.produto[0].slug}`}
                        >
                          <img
                            src={`${produto.produto[0].images[0].src}`}
                            alt=""
                            className={classes.img}
                          />
                        </Link>
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        key={produto.produto[0].id}
                        className={classes.textColor}
                      >
                        {produto.produto[0].name}
                      </TableCell>
                      <TableCell align="right" className={classes.textColor}>
                        {produto.produto[0].price}
                      </TableCell>
                      <TableCell align="right" className={classes.textColor}>
                        <Grid container alignItems="center" justify="center">
                          <Box
                            border={1}
                            marginRight={2}
                            padding={2}
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Typography>{produto.quantidade}</Typography>
                          </Box>
                          <Grid>
                            <Grid container direction="column">
                              <AddIcon
                                className={classes.icon}
                                id={produto.produto[0].id}
                                slot="aumenta"
                                onClick={handleQuantidade}
                              />
                              <RemoveIcon
                                className={classes.icon}
                                id={produto.produto[0].id}
                                slot="diminui"
                                onClick={handleQuantidade}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell align="right">
                        <Typography className={classes.textColor}>
                          {(
                            produto.produto[0].price * produto.quantidade
                          ).toFixed(2)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {kits.map((kit) => {
                  return (
                    <TableRow key={kit.kit[0].id}>
                      <TableCell align="left">
                        <CloseIcon
                          onClick={() => removeKit(kit.kit[0].id)}
                          className={classes.icon}
                        />
                        <img
                          src="https://portaly.demo.skeavee.com/wp-content/uploads/2020/04/073800be12.png"
                          alt=""
                          className={classes.img}
                        />
                      </TableCell>
                      <TableCell>
                        {Object.values(kit.produtos).map((produto) => {
                          return (
                            <Fragment>
                              <Typography
                                key={produto.id}
                                className={classes.textColor}
                              >
                                {produto.name}
                              </Typography>
                            </Fragment>
                          );
                        })}
                      </TableCell>
                      <TableCell align="right">
                        <Typography className={classes.textColor}>
                          {kit.valorDoKit}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Grid container alignItems="center" justify="center">
                          <Box
                            border={1}
                            marginRight={2}
                            padding={2}
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Typography className={classes.textColor}>
                              {kit.quantidadeDoKit}
                            </Typography>
                          </Box>
                          <Grid>
                            <Grid container direction="column">
                              <AddIcon
                                className={classes.icon}
                                onClick={() =>
                                  updateQuantidadeKit(kit.kit[0].id, "aumenta")
                                }
                              />
                              <RemoveIcon
                                className={classes.icon}
                                onClick={() =>
                                  updateQuantidadeKit(kit.kit[0].id, "diminui")
                                }
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell align="right">
                        <Typography className={classes.textColor}>
                          {(kit.valorDoKit * kit.quantidadeDoKit).toFixed(2)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </Fragment>
              <TableRow>
                <TableCell />
                <TableCell align="right">
                  <TextField
                    id="coupon"
                    onChange={handleChange}
                    label="Cupom"
                    value={coupon}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => {
                      handleClick();
                      createMessage();
                    }}
                    focusVisibleClassName="btn"
                    variant="contained"
                    color="primary"
                  >
                    Aplicar
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Grid>
        <Box marginTop={10} marginBottom={3}>
          <Typography variant="h4" className={classes.textColor}>
            Total do carrinho
          </Typography>
        </Box>
        <Box border={2} borderColor={colors.orangeDark}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography className={classes.textColor}>
                    Subtotal
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  {produtosCarrinho.map((produto) => {
                    return (
                      <Typography
                        className={classes.textColor}
                        key={`name${produto.produto[0].id}`}
                      >
                        {`${produto.produto[0].name}`}
                      </Typography>
                    );
                  })}
                  {kits.map((kit, index) => {
                    return (
                      <Typography
                        className={classes.textColor}
                        key={`name${kit.valorDoKit}`}
                      >
                        {`Porta Montada ${index + 1}`}
                      </Typography>
                    );
                  })}
                  <Typography className={classes.textColor}>Total</Typography>
                </TableCell>
                <TableCell align="right">
                  {produtosCarrinho.map((produto) => {
                    return (
                      <Typography
                        className={classes.textColor}
                        key={`sub-total${produto.produto[0].id}`}
                      >
                        {`${produto.quantidade}x ${produto.produto[0].price}`}
                      </Typography>
                    );
                  })}
                  {kits.map((kit) => {
                    return (
                      <Typography
                        className={classes.textColor}
                        key={`sub-total${kit.valorDoKit}`}
                      >
                        {`${kit.quantidadeDoKit}x ${kit.valorDoKit}`}
                      </Typography>
                    );
                  })}
                  <Typography className={classes.textColor}>
                    {carrinho.valorTotal.toFixed(2)}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">
                  <Typography className={classes.textTotal}>Total</Typography>
                </TableCell>
                <TableCell />
                <TableCell align="right">
                  <Typography className={classes.textTotal}>
                    {carrinho.valorTotal.toFixed(2)}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Grid>
    </Grid>
  );
};

export default MostrarProdutos;
